import { Routes, Route } from 'react-router-dom';
import Inventory from './layout/components/Inventory';
import Login from './features/auth/pages/Login';
import AddItem from './layout/components/AddItem'; 
import './App.css';
import Navbar from './layout/components/Navbar';
import EditItem from "./layout/components/EditItem";
import DeleteItem from "./layout/components/DeleteItem";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/add-item" element={<AddItem />} /> 
        <Route path="/edit/:id" element={<EditItem />} />
        <Route path="/delete/:id" element={<DeleteItem />} />
       
      </Routes>
    </div>
  );
}

export default App;