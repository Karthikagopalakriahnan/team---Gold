// import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { loginUser, clearError } from '../../../redux/slices/authSlice'
// import './Login.css'

// const Login = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const { loading, error } = useSelector((state) => state.auth)

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   })

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//     // Clear error when user starts typing
//     if (error) {
//       dispatch(clearError())
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const result = await dispatch(loginUser(formData))
//     if (loginUser.fulfilled.match(result)) {
//       navigate('/dashboard')
//     }
//   }

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2>Login to Gold Billing</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">word</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           {error && <div className="error-message">{error}</div>}
//           <button type="submit" disabled={loading} className="login-btn">
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//         <p className="register-link">
//           Don't have an account? <a href="/register">Register here</a>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Login


import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, clearError } from "../../../redux/slices/authSlice";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  // Redirect after login
  if (isAuthenticated) {
    navigate("/dashboard");
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Gold Billing</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        {/* <p className="register-link">
          Use credentials: <b>admin@test.com / 1234</b>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
