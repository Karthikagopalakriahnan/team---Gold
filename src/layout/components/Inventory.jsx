import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  HiOutlinePencil, 
  HiOutlineTrash, 
  HiOutlineCube, 
  HiOutlineCheckCircle, 
  HiOutlineExclamation, 
  HiOutlineCurrencyRupee, 
  HiOutlineSearch, 
  HiOutlineCog,
  HiOutlineTrendingDown,
  HiOutlineScale,
  HiOutlineShieldCheck
} from "react-icons/hi";
import { updateInventory } from "../../redux/slices/inventorySlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Inventory = () => {
  const { inventory = [], loading, error } = useSelector((state) => state.inventory || {});
  const { isAuthenticated = false } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    if (!isAuthenticated) {
      console.log("Redirecting to /login due to unauthenticated state");
      navigate("/login");
    } else if (!inventory.length) {
      console.log("No inventory data, dispatching updateInventory");
      dispatch(updateInventory([
        { id: "GLD001", productName: "22K Gold Ring", weight: 4.5, purity: "22K", category: "Ring", stockQuantity: 12, pricePerGram: 6243.78, makingCharge: 12, wastage: 10 },
        { id: "GLD002", productName: "24K Gold Necklace", weight: 12.8, purity: "24K", category: "Necklace", stockQuantity: 8, pricePerGram: 6243.44, makingCharge: 3, wastage: 3 },
        { id: "GLD003", productName: "22K Gold Bracelet", weight: 8.2, purity: "22K", category: "Bracelet", stockQuantity: 3, pricePerGram: 6243.78, makingCharge: 4, wastage: 2 },
      ]));
    }
  }, [isAuthenticated, navigate, dispatch, inventory.length]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterStock, setFilterStock] = useState("All Stock");
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    navigate(`/delete/${id}`);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const totalItems = inventory ? inventory.length : 0;
  const totalStock = inventory ? inventory.reduce((sum, item) => sum + (item.stockQuantity || 0), 0) : 0;
  const lowStockItems = inventory ? inventory.filter((item) => (item.stockQuantity || 0) > 0 && (item.stockQuantity || 0) <= 5).length : 0;
  const totalInventoryValue = inventory ? inventory.reduce((sum, item) => sum + ((item.pricePerGram || 0) * (item.weight || 0) * (item.stockQuantity || 0)) / 100000, 0).toFixed(1) : 0;

  const filteredInventory = inventory ? inventory.filter((item) => {
    const categoryMatch = filterCategory === "All Categories" || (item.category && item.category === filterCategory);
    const stockMatch =
      filterStock === "All Stock" ||
      (filterStock === "In Stock" && (item.stockQuantity || 0) > 0) ||
      (filterStock === "Low" && (item.stockQuantity || 0) > 0 && (item.stockQuantity || 0) <= 5) ||
      (filterStock === "Out of Stock" && (item.stockQuantity || 0) === 0);
    const searchMatch = !searchTerm || 
      (item.productName && item.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase()));
    return categoryMatch && stockMatch && searchMatch;
  }) : [];

  console.log("Filtered Inventory:", filteredInventory);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-center">
          <div className="text-blue-600 mb-1">
            <HiOutlineCube className="h-6 w-6 mx-auto" />
          </div>
          <h3 className="text-sm font-semibold text-gray-700">Total Products</h3>
          <p className="text-lg font-bold text-blue-600">{totalItems}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-center">
          <div className="text-green-600 mb-1">
            <HiOutlineCheckCircle className="h-6 w-6 mx-auto" />
          </div>
          <h3 className="text-sm font-semibold text-gray-700">In Stock</h3>
          <p className="text-lg font-bold text-green-600">{totalStock}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-center">
          <div className="text-yellow-600 mb-1">
            <HiOutlineExclamation className="h-6 w-6 mx-auto" />
          </div>
          <h3 className="text-sm font-semibold text-gray-700">Low Stock Alert</h3>
          <p className="text-lg font-bold text-yellow-600">{lowStockItems}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-center">
          <div className="text-yellow-600 mb-1">
            <HiOutlineCurrencyRupee className="h-6 w-6 mx-auto" />
          </div>
          <h3 className="text-sm font-semibold text-gray-700">Total Inventory Value</h3>
          <p className="text-lg font-bold text-yellow-600">₹{totalInventoryValue}L</p>
        </div>
      </div>

      <div className="flex justify-between mb-6 items-center bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
        <div className="flex space-x-4">
          <div className="relative w-48">
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full pl-10"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <select
            className="border border-gray-300 p-2 rounded w-80"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All Categories">All Categories</option>
            <option value="Ring">Ring</option>
            <option value="Necklace">Necklace</option>
            <option value="Bracelet">Bracelet</option>
          </select>
          <select
            className="border border-gray-300 p-2 rounded w-48"
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value)}
          >
            <option value="All Stock">All Stock</option>
            <option value="In Stock">In Stock</option>
            <option value="Low">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
        <button
          onClick={() => navigate("/add-item")}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="border-b p-3 text-center font-bold w-1/7">Barcode/SKU</th>
              <th className="border-b p-3 text-left font-bold w-1/7">Product Details</th>
              <th className="border-b p-3 text-center font-bold w-1/7">Category</th>
              <th className="border-b p-3 text-center font-bold w-1/7 pr-4">Stock</th>
              <th className="border-b p-3 text-left font-bold w-1/7 pl-13">Pricing</th>
              <th className="border-b p-3 text-center font-bold w-1/7">Status</th>
              <th className="border-b p-3 text-center font-bold w-1/7">Actions</th>
            </tr>
          </thead>
          <tbody>
  {filteredInventory.length > 0 ? (
    filteredInventory.map((item) => (
      <tr key={item.id} className="text-center text-xs text-gray-700">
        <td className="border-b p-3">
          <HiOutlineCube className="h-5 w-5 text-blue-600 mx-auto" />
          {item.id || "N/A"}
        </td>
        <td className="border-b p-3 text-left whitespace-normal">
          {item.productName || "N/A"} <br />
          <HiOutlineScale className="h-5 w-5 text-yellow-600 inline-block align-middle mr-1" />
          Weight: {item.weight || 0}g <br />
          <HiOutlineShieldCheck className="h-5 w-5 text-green-600 inline-block align-middle mr-1" />
          Purity: {item.purity || "N/A"}
        </td>
        <td className="border-b p-3">
          {item.category || "N/A"}
        </td>
        <td className="border-b p-3 pr-4">
          {item.stockQuantity || 0} units <br />
          Updated: Just now
        </td>
        <td className="border-b p-3 pl-13 text-left whitespace-normal">
          <HiOutlineCurrencyRupee className="h-5 w-5 text-yellow-600 inline-block align-middle mr-1" />
          ₹{item.pricePerGram || 0}/g <br />
          <HiOutlineCog className="h-5 w-5 text-gray-600 inline-block align-middle mr-1" />
          Making: {item.makingCharge || 0}% | <HiOutlineTrendingDown className="h-5 w-5 text-red-600 inline-block align-middle mr-1" /> Wastage: {item.wastage || 0}%
        </td>
        <td className="border-b p-3">
          {(item.stockQuantity || 0) > 0 ? (
            (item.stockQuantity || 0) <= 5 ? (
              <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Low Stock</span>
            ) : (
              <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full">In Stock</span>
            )
          ) : (
            <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full">Out of Stock</span>
          )}
        </td>
        <td className="border-b p-3">
          <button
            className="text-blue-500 mr-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => handleEdit(item.id)}
          >
            <HiOutlinePencil className="h-5 w-5" />
          </button>
          <button
            className="text-red-500 p-1 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => handleDelete(item.id)}
          >
            <HiOutlineTrash className="h-5 w-5" />
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="border-b p-4 text-center text-gray-500 text-xs">
        {inventory && inventory.length === 0 ? "No inventory data available." : "No items match the selected filters."}
      </td>
    </tr>
  )}
</tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Inventory;