
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

export default function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-yellow-500 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Gold shop</h1>

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

          <button
            onClick={handleLogout}
            className="hover:text-yellow-200 font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
