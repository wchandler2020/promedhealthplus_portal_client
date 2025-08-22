// utils/auth.js

import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './constants';
import axiosAuth from './axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const verifyToken = async (token) => {
    const axiosInstance = axiosAuth();
    try {
      // const response = await axiosInstance.get(`${API_BASE_URL}/me/`)
      const response = await axiosInstance.get(`${API_BASE_URL}/provider/profile/`)
  
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error verifying token:', error);
      return {
        success: false,
        error: error.response?.data || 'Token verification failed',
      };
    }
  };

  const sendVerificationToken = async () => {
    const axiosInstance = axiosAuth();
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/send-code/`, { method: 'sms' });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error sending verification token:', error);
      return {
        success: false,
        error: error.response?.data || 'Failed to send verification token',
      };
    }
  };

  const register = async (fullName, email, password, password2) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/provider/register/`, {
        full_name: fullName,
        email,
        password,
        password2
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Registration failed',
      };
    }
  };

  const login = async (email, password, method = 'sms') => {
    try {
      const response = await axios.post(`${API_BASE_URL}/provider/token/`, {
        email,
        password,
        method, // pass method to backend
      });

      if (response.data.mfa_required) {
        // Store tokens temporarily for verification step
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        localStorage.setItem('session_id', response.data.session_id)
        localStorage.setItem('user', JSON.stringify({ email, verified: false }));
        setUser({ email, verified: false });
        return {
          mfa_required: true,
          session_id: response.data.session_id,
          detail: response.data.detail,
        };
      }

      const { access, refresh, user:userData } = response.data;
      // const userData = { email, verified: true };

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Login failed',
      };
    }
  };

  const verifyCode = async (code) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const session_id = localStorage.getItem('session_id');
      const response = await axios.post(
        `${API_BASE_URL}/verify-code/`,
        { code, session_id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Mark user as verified
      const userData =JSON.parse( localStorage.getItem('user'))
      userData.verified = true
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Verification failed',
      };
    }
  };

  const getPatients = async () => {
  try {
    const axiosInstance = axiosAuth();
    const res = await axiosInstance.get(`${API_BASE_URL}/patient/patients/`);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Failed to fetch patients:", error);
    return { success: false, error: error.response?.data || error };
  }
};

const postPatient = async (patientData) => {
  try {
    const axiosInstance = axiosAuth();
    const res = await axiosInstance.post(`${API_BASE_URL}/patient/patients/`, patientData);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Failed to add patient:", error);
    return { success: false, error: error.response?.data || {}, message: error.response?.data?.detail|| error.message || "Failed to add patient" };
  }
};
  

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, getPatients, postPatient, setUser, register, sendVerificationToken, login, verifyCode, logout, verifyToken, }}>
      {children}
    </AuthContext.Provider>
  );
};