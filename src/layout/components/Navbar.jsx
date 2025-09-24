
import { NavLink } from "react-router-dom";

export default function Navbar() {
        
  return (
    <nav className="bg-yellow-500 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Gold Billing</h1>

        <div className="flex space-x-6">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `hover:text-yellow-200 font-medium ${
                isActive ? "underline" : ""
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              `hover:text-yellow-200 font-medium ${
                isActive ? "underline" : ""
              }`
            }
          >
            Inventory
          </NavLink>

          <NavLink
            to="/billing"
            className={({ isActive }) =>
              `hover:text-yellow-200 font-medium ${
                isActive ? "underline" : ""
              }`
            }
          >
            Billing
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
