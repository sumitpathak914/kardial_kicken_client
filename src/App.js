import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Auth/Layout';
import Login from './Auth/Login';
import ProtectedRoute from './Auth/ProtectedRoute';
import AddArchitect from './Dashboard/AddArchitect';
import AddClient from './Dashboard/AddClient';
import EmpRegistration from './Dashboard/EmpRegistration';
import Home from './Dashboard/Home';
import AddCategory from './Dashboard/AddCategory';
import AddQuality from './Dashboard/AddQuality';
import AddProduct from './Dashboard/AddProduct';
import Process from './Dashboard/Process';
import CreateProcess from './Dashboard/createProcess';
import RateSection from './Dashboard/RateSection';



function App() {
  const [token, setToken] = useState(null);

  // Check for token in sessionStorage when the component mounts
  useEffect(() => {
    const storedToken = sessionStorage.getItem('authToken');
    setToken(storedToken); // Set the token to state
  }, []);

  return (
    <div className="flex h-screen">

      {/* {token && <SidebarComponent />} */}
      <Layout />

      <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>} />




          <Route path="/registration" element={<ProtectedRoute>
            <EmpRegistration />
          </ProtectedRoute>} />
          <Route path="/add-client" element={<ProtectedRoute>
            <AddClient />
          </ProtectedRoute>} />
          <Route path="/add-Architect" element={<ProtectedRoute>
            <AddArchitect />
          </ProtectedRoute>} />
          <Route path="/add-category" element={<ProtectedRoute>
            <AddCategory />
          </ProtectedRoute>} />
          <Route path="/add-quality" element={<ProtectedRoute>
            <AddQuality />
          </ProtectedRoute>} />
          <Route path="/add-material-product" element={<ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>} />
          <Route path="/Final_Client" element={<ProtectedRoute>
            <Process />
          </ProtectedRoute>} />
          <Route path="/Rate-Section" element={<ProtectedRoute>
            <RateSection />
          </ProtectedRoute>} />
          
          <Route path="/create-process" element={
            <CreateProcess />
      } />

        </Routes>
      </div>
    </div>
  );
}

export default App;
