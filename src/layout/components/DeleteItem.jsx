import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateInventory } from "../../redux/slices/inventorySlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteItem = () => {
  const { inventory } = useSelector((state) => state.inventory);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const itemToDelete = inventory.find((item) => item.id === id);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (!itemToDelete) {
      toast.error("Item not found!");
      setTimeout(() => navigate("/inventory"), 1500);
    }
  }, [isAuthenticated, itemToDelete, navigate]);

  const handleDelete = () => {
    const updatedInventory = inventory.filter((item) => item.id !== id);
    dispatch(updateInventory(updatedInventory));
    toast.success("Product deleted successfully!");
    setTimeout(() => navigate("/inventory"), 1500);
  };

  const handleCancel = () => {
    navigate("/inventory");
  };

  if (!itemToDelete) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-4">Item Not Found</h2>
          <button
            onClick={() => navigate("/inventory")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Inventory
          </button>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Delete Product</h2>
        <div className="mb-6">
          <p className="text-gray-600 mb-4 text-center">
            Delete <strong>{itemToDelete.productName}</strong> (ID: {itemToDelete.id})? This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DeleteItem;