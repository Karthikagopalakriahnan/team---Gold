import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Database setup
const sqlite = sqlite3.verbose();
const dbFile = process.env.DB_PATH || path.join(__dirname, "goldshop.db");
const db = new sqlite.Database(dbFile, (err) => {
  if (err) {
    console.error("❌ Failed to open DB:", err.message);
    process.exit(1);
  } else {
    console.log("✅ Connected to SQLite database.");
  }
});

// -----------------------------------------------------
//  TABLE CREATION
// -----------------------------------------------------
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY,
      name TEXT,
      phone TEXT,
      address TEXT,
      email TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS bills (
      id TEXT PRIMARY KEY,
      customer TEXT,
      items TEXT,
      subtotal REAL,
      gst REAL,
      total REAL,
      date TEXT,
      status TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      barcode TEXT UNIQUE,
      name TEXT,
      category TEXT,
      supplier TEXT,
      weight REAL,
      purity TEXT,
      quantity INTEGER,
      price_per_gram REAL,
      price_per_unit REAL,
      making_charges REAL,
      wastage_percent REAL,
      selling_price REAL,
      low_stock_alert INTEGER,
      date_added TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE
    )
  `);
});

// -----------------------------------------------------
//  CUSTOMER ROUTES
// -----------------------------------------------------
app.get("/api/customers/:id", (req, res) => {
  db.get("SELECT * FROM customers WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) {
      const defaultCustomer = {
        id: parseInt(req.params.id),
        name: "John Doe",
        phone: "9876543210",
        address: "123 Main St, Gold City",
        email: "john.doe@example.com",
      };
      db.run(
        "INSERT INTO customers (id, name, phone, address, email) VALUES (?, ?, ?, ?, ?)",
        [defaultCustomer.id, defaultCustomer.name, defaultCustomer.phone, defaultCustomer.address, defaultCustomer.email],
        (insertErr) => {
          if (insertErr) return res.status(500).json({ error: insertErr.message });
          res.json(defaultCustomer);
        }
      );
    } else res.json(row);
  });
});

app.put("/api/customers/:id", (req, res) => {
  const { name, phone, address, email } = req.body;
  db.run(
    "UPDATE customers SET name=?, phone=?, address=?, email=? WHERE id=?",
    [name, phone, address, email, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: parseInt(req.params.id), name, phone, address, email });
    }
  );
});

// -----------------------------------------------------
//  BILL ROUTES
// -----------------------------------------------------
app.post("/api/bills", (req, res) => {
  const { id, customer, items, subtotal, gst, total, date, status } = req.body;
  db.run(
    `INSERT INTO bills (id, customer, items, subtotal, gst, total, date, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, JSON.stringify(customer), JSON.stringify(items), subtotal, gst, total, date, status],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(req.body);
    }
  );
});

app.get("/api/bills", (req, res) => {
  db.all("SELECT * FROM bills", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const bills = rows.map((r) => ({
      ...r,
      customer: JSON.parse(r.customer),
      items: JSON.parse(r.items),
    }));
    res.json(bills);
  });
});

// -----------------------------------------------------
//  CATEGORY ROUTES
// -----------------------------------------------------
app.post("/api/categories", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Category name is required" });

  db.run("INSERT INTO categories (name) VALUES (?)", [name], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(409).json({ error: "Category already exists" });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name });
  });
});

app.get("/api/categories", (req, res) => {
  db.all("SELECT * FROM categories ORDER BY name ASC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.delete("/api/categories/:id", (req, res) => {
  db.run("DELETE FROM categories WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Not found" });
    res.json({ deleted: this.changes });
  });
});

// -----------------------------------------------------
//  INVENTORY ROUTES
// -----------------------------------------------------
app.post("/api/inventory", (req, res) => {
  const {
    barcode,
    name,
    category,
    supplier,
    weight,
    purity,
    quantity,
    price_per_gram,
    price_per_unit,
    making_charges,
    wastage_percent,
    selling_price,
    low_stock_alert,
    date_added,
  } = req.body;

  if (!barcode || !name) {
    return res.status(400).json({ error: "barcode and name are required" });
  }

  db.run(
    `INSERT INTO inventory (barcode, name, category, supplier, weight, purity, quantity, price_per_gram, price_per_unit, making_charges, wastage_percent, selling_price, low_stock_alert, date_added)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      barcode,
      name,
      category || "",
      supplier || "",
      weight || 0,
      purity || "",
      quantity || 0,
      price_per_gram || 0,
      price_per_unit || 0,
      making_charges || 0,
      wastage_percent || 0,
      selling_price || 0,
      low_stock_alert || 0,
      date_added || new Date().toISOString(),
    ],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          return res.status(409).json({ error: "barcode already exists" });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, ...req.body });
    }
  );
});

app.get("/api/inventory", (req, res) => {
  db.all("SELECT * FROM inventory", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get("/api/inventory/:id", (req, res) => {
  db.get("SELECT * FROM inventory WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  });
});

app.put("/api/inventory/:id", (req, res) => {
  const {
    barcode,
    name,
    category,
    supplier,
    weight,
    purity,
    quantity,
    price_per_gram,
    price_per_unit,
    making_charges,
    wastage_percent,
    selling_price,
    low_stock_alert,
    date_added,
  } = req.body;

  db.run(
    `UPDATE inventory SET
     barcode=?, name=?, category=?, supplier=?, weight=?, purity=?, quantity=?, price_per_gram=?, price_per_unit=?, making_charges=?, wastage_percent=?, selling_price=?, low_stock_alert=?, date_added=?
     WHERE id=?`,
    [
      barcode,
      name,
      category,
      supplier,
      weight,
      purity,
      quantity,
      price_per_gram,
      price_per_unit,
      making_charges,
      wastage_percent,
      selling_price,
      low_stock_alert,
      date_added,
      req.params.id,
    ],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          return res.status(409).json({ error: "barcode already exists" });
        }
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) return res.status(404).json({ error: "Not found" });
      res.json({ updated: this.changes });
    }
  );
});

app.delete("/api/inventory/:id", (req, res) => {
  db.run("DELETE FROM inventory WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Not found" });
    res.json({ deleted: this.changes });
  });
});

app.get("/api/inventory/filter/low-stock", (req, res) => {
  db.all("SELECT * FROM inventory WHERE quantity <= low_stock_alert", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get("/api/inventory/filter/category/:category", (req, res) => {
  db.all("SELECT * FROM inventory WHERE category = ?", [req.params.category], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// -----------------------------------------------------
//  SHUTDOWN & START
// -----------------------------------------------------
process.on("SIGINT", () => {
  console.log("🛑 Closing database connection...");
  db.close((err) => {
    if (err) console.error("Error closing DB:", err.message);
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
