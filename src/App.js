import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import './App.css';
import LoginSignUp from './pages/LoginSignUp';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import ProductDetail from './pages/ProductDetail';
import Breadcrumb from './components/Breadcrumb';
import ProductStack from './pages/Dashboard/ProductStack';
import AddProduct from './pages/Dashboard/AddProduct';
import EditProduct from './pages/Dashboard/EditProduct';
import { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { setUser } from './redux/slice/AuthSlice';
import axios from 'axios';
import Shop from './pages/Shop';

function App() {
  const { user } = useSelector(state => state.userAuth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('token');
      console.log('token', token);
      const result = await axios.get(
        `${process.env.REACT_APP_USER_API_URL}/profile`
      );
      console.log("This is result",result.status);
      if (result.status === 200) {
        dispatch(setUser(result.data.data)); 
        setLoading(false);
        navigate('/');
      }
    } catch (error) {
      setLoading(false)
      console.log("This is error", error);
      navigate('/login')
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      {loading ? (
        <div>
          Loading....
        </div>
      ) : (
        <div className="min-h-screen min-w-screen">
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                zIndex: 9999,
              },
            }}
          />
          {user && <Navbar />}
          {user && <Breadcrumb />}
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop/>} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <LoginSignUp />} />
            
            <Route path="/:category/product/:id" element={<ProductDetail />} />
            {user ? (
              <>
                <Route path="/dashboard" element={<ProductStack />} />
                <Route path="/dashboard/new" element={<AddProduct />} />
                <Route path="/admin/edit/:id" element={<EditProduct />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
