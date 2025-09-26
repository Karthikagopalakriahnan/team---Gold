// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { updateInventory } from "../../redux/slices/inventorySlice";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddItem = () => {
//   const { inventory } = useSelector((state) => state.inventory);
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//     }
//   }, [isAuthenticated, navigate]);

//   const [formData, setFormData] = useState({
//     id: "",
//     productName: "",
//     category: "",
//     supplier: "",
//     weight: "",
//     purity: "",
//     stockQuantity: "",
//     pricePerGram: "",
//     pricePerUnit: "",
//     makingCharge: "",
//     wastage: "",
//     sellingPrice: "",
//     lowStockAlert: 5,
//     dateAdded: new Date().toLocaleDateString("en-GB").replace(/\//g, "/"),
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     setError("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (
//       !formData.id ||
//       !formData.productName ||
//       !formData.weight ||
//       !formData.purity ||
//       !formData.stockQuantity
//     ) {
//       setError("Please fill all required fields.");
//       toast.error("Please fill all required fields.");
//       return;
//     }

//     const newItem = {
//       id: formData.id,
//       productName: formData.productName,
//       category: formData.category,
//       supplier: formData.supplier,
//       weight: parseFloat(formData.weight),
//       purity: formData.purity,
//       stockQuantity: parseInt(formData.stockQuantity, 10),
//       pricePerGram: parseFloat(formData.pricePerGram) || 0,
//       pricePerUnit: parseFloat(formData.pricePerUnit) || 0,
//       makingCharge: parseFloat(formData.makingCharge) || 0,
//       wastage: parseFloat(formData.wastage) || 0,
//       sellingPrice: parseFloat(formData.sellingPrice) || 0,
//       lowStockAlert: parseInt(formData.lowStockAlert, 10) || 5,
//       dateAdded: formData.dateAdded,
//     };

//     const idExists = inventory.some((item) => item.id === newItem.id);
//     if (idExists) {
//       setError("Product ID already exists. Use a unique ID.");
//       toast.error("Product ID already exists. Use a unique ID.");
//       return;
//     }

//     const updatedInventory = [...inventory, newItem];
//     dispatch(updateInventory(updatedInventory));
//     setError("Product added successfully!");
//     toast.success("Product added successfully!");
//     setTimeout(() => navigate("/inventory"), 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 relative">
//         <button
//           type="button"
//           onClick={() => navigate("/inventory")}
//           className="absolute top-4 right-9 text-gray-500 hover:text-gray-700 text-3xl font-bold"
//         >
//           &times;
//         </button>
//         <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>

//         {error && (
//           <div
//             className={`p-3 rounded mb-4 ${
//               error.includes("successfully")
//                 ? "bg-green-100 text-green-800 border border-green-300"
//                 : "bg-red-100 text-red-800 border border-red-300"
//             } text-center`}
//           >
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="border p-4 rounded">
//             <h3 className="font-semibold mb-2">Product Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex flex-col">
//                 <label htmlFor="id" className="mb-1 font-medium">
//                   Barcode/SKU *
//                 </label>
//                 <input
//                   type="text"
//                   id="id"
//                   name="id"
//                   value={formData.id}
//                   onChange={handleChange}
//                   className="border p-2 rounded"
//                   required
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="productName" className="mb-1 font-medium">
//                   Product Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="productName"
//                   name="productName"
//                   value={formData.productName}
//                   onChange={handleChange}
//                   className="border p-2 rounded"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
//               <div className="flex flex-col">
//                 <label htmlFor="category" className="mb-1 font-medium">
//                   Category
//                 </label>
//                 <select
//                   id="category"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className="border p-2 rounded"
//                 >
//                   <option value="">Select Category</option>
//                   <option value="Ring">Ring</option>
//                   <option value="Necklace">Necklace</option>
//                   <option value="Bracelet">Bracelet</option>
//                   <option value="Earrings">Earrings</option>
//                   <option value="Pendant">Pendant</option>
//                   <option value="Chain">Chain</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="border p-4 rounded">
//             <h3 className="font-semibold mb-2">Physical Properties</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="flex flex-col">
//                 <label htmlFor="weight" className="mb-1 font-medium">
//                   Weight (grams) *
//                 </label>
//                 <input
//                   type="number"
//                   id="weight"
//                   name="weight"
//                   value={formData.weight}
//                   onChange={handleChange}
//                   className="border p-2 rounded"
//                   step="0.1"
//                   required
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="purity" className="mb-1 font-medium">
//                   Purity *
//                 </label>
//                 <select
//                   id="purity"
//                   name="purity"
//                   value={formData.purity}
//                   onChange={handleChange}
//                   className="border p-2 rounded"
//                   required
//                 >
//                   <option value="">Select Purity</option>
//                   <option value="18K">18K</option>
//                   <option value="22K">22K</option>
//                   <option value="24K">24K</option>
//                 </select>
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="stockQuantity" className="mb-1 font-medium">
//                   Stock Quantity *
//                 </label>
//                 <input
//                   type="number"
//                   id="stockQuantity"
//                   name="stockQuantity"
//                   value={formData.stockQuantity}
//                   onChange={handleChange}
//                   className="border p-2 rounded"
//                   min="0"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Pricing Details */}
//           <div className="border p-4 rounded">
//             <h3 className="font-semibold mb-2">Pricing Details</h3>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div className="flex flex-col">
//                 <label htmlFor="pricePerGram" className="mb-1 font-medium">
//                   Price per Gram (₹)
//                 </label>
//                 <input
//                   type="number"
//                   id="pricePerGram"
//                   name="pricePerGram"
//                   value={formData.pricePerGram}
//                   onChange={handleChange}
//                   className="border p-2 rounded"
//                   min="0"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="pricePerUnit" className="mb-1 font-medium">
//                   Price per Unit (₹)
//                 </label>
//                 <input
//                   type="number"
//                   id="pricePerUnit"
//                   name="pricePerUnit"
//                   value={formData.pricePerUnit}
//                   onChange={handleChange}
//                   className="border p-2 rounded"
//                   min="0"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="makingCharge" className="mb-1 font-medium">
//                   Making Charges (%)
//                 </label>
//                 <input
//                   type="number"
//                   id="makingCharge"
//                   name="makingCharge"
//                   value={formData.makingCharge}
//                   onChange={handleChange}
//                   className="border p-2 rounded"
//                   min="0"
//                   max="100"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="wastage" className="mb-1 font-medium">
//                   Wastage (%)
//                 </label>
//                 <input
//                   type="number"
//                   id="wastage"
//                   name="wastage"
//                   value={formData.wastage}
//                   onChange={handleChange}
//                   className="border p-2 rounded"
//                   min="0"
//                   max="100"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
//               <div className="flex flex-col">
//                 <label htmlFor="sellingPrice" className="mb-1 font-medium">
//                   Selling Price (₹)
//                 </label>
//                 <input
//                   type="number"
//                   id="sellingPrice"
//                   name="sellingPrice"
//                   value={formData.sellingPrice}
//                   onChange={handleChange}
//                   className="border p-2 rounded"
//                   min="0"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="lowStockAlert" className="mb-1 font-medium">
//                   Low Stock Alert
//                 </label>
//                 <input
//                   type="number"
//                   id="lowStockAlert"
//                   name="lowStockAlert"
//                   value={formData.lowStockAlert}
//                   onChange={handleChange}
//                   className="border p-2 rounded"
//                   min="0"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex justify-end space-x-4 pt-4 border-t">
//             <button
//               type="button"
//               onClick={() => navigate("/inventory")}
//               className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-purple-700 font-medium"
//             >
//               Add Product
//             </button>
//           </div>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default AddItem;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateInventory } from "../../redux/slices/inventorySlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BarcodeScanner from "react-qr-barcode-scanner"; // New import for barcode scanner

const AddItem = () => {
  const { inventory } = useSelector((state) => state.inventory);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    category: "",
    supplier: "",
    weight: "",
    purity: "",
    stockQuantity: "",
    pricePerGram: "",
    pricePerUnit: "",
    makingCharge: "",
    wastage: "",
    sellingPrice: "",
    lowStockAlert: 5,
    dateAdded: new Date().toLocaleDateString("en-GB").replace(/\//g, "/"),
  });
  const [error, setError] = useState("");
  const [showScanner, setShowScanner] = useState(false); // New state for scanner modal

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  // New handler for successful barcode scan
  const handleScan = (err, result) => {
    if (result && result.text) {
      setFormData((prev) => ({ ...prev, id: result.text }));
      toast.success("Barcode scanned successfully!");
      setShowScanner(false); // Close modal
      setError(""); // Clear any errors
    } else if (err) {
      toast.error("Scan failed. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.id ||
      !formData.productName ||
      !formData.weight ||
      !formData.purity ||
      !formData.stockQuantity
    ) {
      setError("Please fill all required fields.");
      toast.error("Please fill all required fields.");
      return;
    }

    const newItem = {
      id: formData.id,
      productName: formData.productName,
      category: formData.category,
      supplier: formData.supplier,
      weight: parseFloat(formData.weight),
      purity: formData.purity,
      stockQuantity: parseInt(formData.stockQuantity, 10),
      pricePerGram: parseFloat(formData.pricePerGram) || 0,
      pricePerUnit: parseFloat(formData.pricePerUnit) || 0,
      makingCharge: parseFloat(formData.makingCharge) || 0,
      wastage: parseFloat(formData.wastage) || 0,
      sellingPrice: parseFloat(formData.sellingPrice) || 0,
      lowStockAlert: parseInt(formData.lowStockAlert, 10) || 5,
      dateAdded: formData.dateAdded,
    };

    const idExists = inventory.some((item) => item.id === newItem.id);
    if (idExists) {
      setError("Product ID already exists. Use a unique ID.");
      toast.error("Product ID already exists. Use a unique ID.");
      return;
    }

    const updatedInventory = [...inventory, newItem];
    dispatch(updateInventory(updatedInventory));
    setError("Product added successfully!");
    toast.success("Product added successfully!");
    setTimeout(() => navigate("/inventory"), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 relative">
        <button
          type="button"
          onClick={() => navigate("/inventory")}
          className="absolute top-4 right-9 text-gray-500 hover:text-gray-700 text-3xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>

        {error && (
          <div
            className={`p-3 rounded mb-4 ${
              error.includes("successfully")
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            } text-center`}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-2">Product Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="id" className="mb-1 font-medium">
                  Barcode/SKU *
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    className="border p-2 rounded flex-1"
                    required
                  />
                  {/* New Scan Button */}
                  <button
                    type="button"
                    onClick={() => setShowScanner(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-medium"
                  >
                    Scan
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="productName" className="mb-1 font-medium">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col">
                <label htmlFor="category" className="mb-1 font-medium">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select Category</option>
                  <option value="Ring">Ring</option>
                  <option value="Necklace">Necklace</option>
                  <option value="Bracelet">Bracelet</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Pendant">Pendant</option>
                  <option value="Chain">Chain</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-2">Physical Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label htmlFor="weight" className="mb-1 font-medium">
                  Weight (grams) *
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  step="0.1"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="purity" className="mb-1 font-medium">
                  Purity *
                </label>
                <select
                  id="purity"
                  name="purity"
                  value={formData.purity}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                >
                  <option value="">Select Purity</option>
                  <option value="18K">18K</option>
                  <option value="22K">22K</option>
                  <option value="24K">24K</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="stockQuantity" className="mb-1 font-medium">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  id="stockQuantity"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pricing Details */}
          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-2">Pricing Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label htmlFor="pricePerGram" className="mb-1 font-medium">
                  Price per Gram (₹)
                </label>
                <input
                  type="number"
                  id="pricePerGram"
                  name="pricePerGram"
                  value={formData.pricePerGram}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  min="0"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="pricePerUnit" className="mb-1 font-medium">
                  Price per Unit (₹)
                </label>
                <input
                  type="number"
                  id="pricePerUnit"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  min="0"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="makingCharge" className="mb-1 font-medium">
                  Making Charges (%)
                </label>
                <input
                  type="number"
                  id="makingCharge"
                  name="makingCharge"
                  value={formData.makingCharge}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  min="0"
                  max="100"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="wastage" className="mb-1 font-medium">
                  Wastage (%)
                </label>
                <input
                  type="number"
                  id="wastage"
                  name="wastage"
                  value={formData.wastage}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col">
                <label htmlFor="sellingPrice" className="mb-1 font-medium">
                  Selling Price (₹)
                </label>
                <input
                  type="number"
                  id="sellingPrice"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  min="0"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lowStockAlert" className="mb-1 font-medium">
                  Low Stock Alert
                </label>
                <input
                  type="number"
                  id="lowStockAlert"
                  name="lowStockAlert"
                  value={formData.lowStockAlert}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate("/inventory")}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-purple-700 font-medium"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* New Scanner Modal
      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              type="button"
              onClick={() => setShowScanner(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-center">Scan Barcode</h3>
            <div className="flex justify-center mb-4">
              <BarcodeScanner
                width={300}
                height={300}
                onUpdate={handleScan}
                // Optional: Specify barcode formats for faster scanning (e.g., CODE_128 for gold product SKUs)
                // formats={['CODE_128', 'EAN_13', 'UPC_A']}
              />
            </div>
            <p className="text-sm text-gray-600 text-center">Point your camera at the barcode</p>
          </div>
        </div>
      )} */}

      <ToastContainer />
    </div>
  );
};

export default AddItem;