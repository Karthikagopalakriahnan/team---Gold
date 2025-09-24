
import { createSlice } from '@reduxjs/toolkit';

// Mock data
const mockInventory = [
  { id: 'GLD001', name: '22K Gold Ring', weight: 4.5, purity: '22K', stock: 12, price: 28102, category: 'Ring', dateAdded: '15/09/2025' },
  { id: 'GLD002', name: '24K Gold Necklace', weight: 12.8, purity: '24K', stock: 8, price: 79936, category: 'Necklace', dateAdded: '14/09/2025' },
  { id: 'GLD003', name: '22K Gold Bracelet', weight: 8.2, purity: '22K', stock: 3, price: 51209, category: 'Bracelet', dateAdded: '13/09/2025' },
];

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    inventory: mockInventory,
    loading: false,
    error: null,
  },
  reducers: {
    updateInventory(state, action) {
      state.inventory = action.payload;
    },
  },
});

export const { updateInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
