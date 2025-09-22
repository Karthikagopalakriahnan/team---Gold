import axios from 'axios'

// Create axios instance for API calls
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor to handle token expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authActions = {
  // Login action
  login: async (credentials) => {
    try {
      const response = await API.post('/auth/login', credentials)
      const { token, user } = response.data
      localStorage.setItem('token', token)
      return { success: true, data: { token, user } }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      }
    }
  },

  // Register action
  register: async (userData) => {
    try {
      const response = await API.post('/auth/register', userData)
      const { token, user } = response.data
      localStorage.setItem('token', token)
      return { success: true, data: { token, user } }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      }
    }
  },

  // Logout action
  logout: () => {
    localStorage.removeItem('token')
    return { success: true }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await API.get('/auth/me')
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to get user data' 
      }
    }
  }
}

export default API
