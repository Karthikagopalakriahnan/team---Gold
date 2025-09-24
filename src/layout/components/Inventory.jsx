import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { updateInventory } from '../../redux/slices/inventorySlice'; // Adjust path as needed

const Inventory = () => {
  const { inventory, loading, error } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  const [barcode, setBarcode] = useState('');

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  const handleEdit = (id) => {
    console.log('Edit item:', id); // Replace with your edit logic
  };

  const handleDelete = (id) => {
    console.log('Delete item:', id); // Replace with your delete logic
  };

  // Mock barcode to product mapping
  const barcodeToProduct = {
    '123456789': { id: 'GLD004', name: '18K Gold Earrings', weight: 3.2, purity: '18K', stock: 10, price: 15000, category: 'Earrings', dateAdded: '24/09/2025' },
    '987654321': { id: 'GLD005', name: '24K Gold Pendant', weight: 5.0, purity: '24K', stock: 5, price: 30000, category: 'Pendant', dateAdded: '24/09/2025' },
  };

  const handleBarcodeScan = (e) => {
    const scannedBarcode = e.target.value;
    setBarcode(scannedBarcode);

    if (scannedBarcode && barcodeToProduct[scannedBarcode]) {
      const newProduct = barcodeToProduct[scannedBarcode];
      const updatedInventory = [...inventory, newProduct];
      dispatch(updateInventory(updatedInventory));
      setBarcode(''); // Clear input after adding
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Scan barcode..."
            value={barcode}
            onChange={handleBarcodeScan}
            className="border p-2 rounded"
          />
          <select className="border p-2 rounded">
            <option>All Categories</option>
            <option>Ring</option>
            <option>Necklace</option>
            <option>Bracelet</option>
            <option>Earrings</option>
            <option>Pendant</option>
          </select>
          <select className="border p-2 rounded">
            <option>All Purities</option>
            <option>18K</option>
            <option>22K</option>
            <option>24K</option>
          </select>
          <select className="border p-2 rounded">
            <option>All Items</option>
            <option>In Stock</option>
            <option>Low</option>
          </select>
        </div>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">+ Add New Item</button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID/SKU</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Weight (g)</th>
            <th className="border p-2">Purity</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Date Added</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.weight}</td>
              <td className="border p-2">{item.purity}</td>
              <td className="border p-2">{item.stock}</td>
              <td className="border p-2">{item.price}</td>
              <td className="border p-2">{item.category}</td>
              <td className="border p-2">{item.dateAdded}</td>
              <td className="border p-2">
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
