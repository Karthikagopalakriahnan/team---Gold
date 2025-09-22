import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'

const Header = ({ onToggleSidebar }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <h1 className="app-title">Gold Billing</h1>
      </div>
      <div className="header-right">
        {user && (
          <div className="user-info">
            <span>Welcome, {user.name || user.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
