import { createSlice } from '@reduxjs/toolkit';

const mockInventory = [
  {
    id: 'GLD001',
    productName: '22K Gold Ring',
    category: 'Ring',
    weight: 4.5,
    purity: '22K',
    stockQuantity: 12,
    pricePerGram: 6244.89,
    makingCharge: 12,       
    wastage: 10,            
    dateAdded: '15/09/2025',
  },
  {
    id: 'GLD002',
    productName: '24K Gold Necklace',
    category: 'Necklace',
    weight: 12.8,
    purity: '24K',
    stockQuantity: 8,
    pricePerGram: 6243.44,
    makingCharge: 3,       
    wastage: 3,            
    dateAdded: '14/09/2025',
  },
  {
    id: 'GLD003',
    productName: '22K Gold Bracelet',
    category: 'Bracelet',
    weight: 8.2,
    purity: '22K',
    stockQuantity: 3,
    pricePerGram: 6243.78, 
    makingCharge: 4,       
    wastage: 2,            
    dateAdded: '13/09/2025',
  },
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