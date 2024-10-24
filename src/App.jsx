import { useState } from 'react';
// import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import Login from './pages/Login';
import Signup from './pages/SIgnup';
import { AuthProvider } from './Context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedROutes';

import { DataProvider } from './Context/DataContext';

import MainPage from './pages/Main';
import Settings from './pages/Settings';
import { FilterProvider } from './Context/FilterContext';

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <DataProvider>
        <FilterProvider>
      <Router>
      
      
        <Routes>
      
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/" element={<AppRoutes />} />
          <Route path="/data" element={<DataCoverage />} /> */}
          {/* <Route path='/main' element ={<MainPage/>}/> */}
          {/* <Route path='/setting' element = {<Settings/>}/> */}



          <Route path="/" element={<ProtectedRoute element={<MainPage />} />} />
          {/* <Route path="/data" element={<ProtectedRoute element={<DataCoverage />} />} /> */}
          {/* <Route path="/setting" element={<Settings />} /> */}
        
          {/* Add more routes as needed */}
        </Routes>
      </Router>
      </FilterProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
