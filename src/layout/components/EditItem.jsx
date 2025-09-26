import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateInventory } from "../../redux/slices/inventorySlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditItem = () => {
  const { inventory } = useSelector((state) => state.inventory);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Find the item to edit based on id
  const itemToEdit = inventory.find((item) => item.id === id);
  const [formData, setFormData] = useState({
    id: itemToEdit?.id || "",
    productName: itemToEdit?.productName || "",
    category: itemToEdit?.category || "",
    supplier: itemToEdit?.supplier || "",
    weight: itemToEdit?.weight || "",
    purity: itemToEdit?.purity || "",
    stockQuantity: itemToEdit?.stockQuantity || "",
    pricePerGram: itemToEdit?.pricePerGram || "",
    pricePerUnit: itemToEdit?.pricePerUnit || "",
    makingCharge: itemToEdit?.makingCharge || "",
    wastage: itemToEdit?.wastage || "",
    sellingPrice: itemToEdit?.sellingPrice || "",
    lowStockAlert: itemToEdit?.lowStockAlert || 5,
    dateAdded: itemToEdit?.dateAdded || new Date().toLocaleDateString("en-GB").replace(/\//g, "/"),
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        id: itemToEdit.id,
        productName: itemToEdit.productName,
        category: itemToEdit.category,
        supplier: itemToEdit.supplier,
        weight: itemToEdit.weight,
        purity: itemToEdit.purity,
        stockQuantity: itemToEdit.stockQuantity,
        pricePerGram: itemToEdit.pricePerGram,
        pricePerUnit: itemToEdit.pricePerUnit,
        makingCharge: itemToEdit.makingCharge,
        wastage: itemToEdit.wastage,
        sellingPrice: itemToEdit.sellingPrice,
        lowStockAlert: itemToEdit.lowStockAlert,
        dateAdded: itemToEdit.dateAdded,
      });
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
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

    const updatedItem = {
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

    const updatedInventory = inventory.map((item) =>
      item.id === id ? updatedItem : item
    );
    dispatch(updateInventory(updatedInventory));
    setError("Product updated successfully!");
    toast.success("Product updated successfully!");
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
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Product</h2>

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
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                  disabled // ID should not be editable
                />
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditItem;    