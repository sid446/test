import './App.css';
import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import Detail from './components/Detail';

function App() {
  const { isAuth } = useContext(AuthContext);

  return (
    <Routes>
     
      <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />

      <Route path="/" element={ 
        <div className='h-screen'>
          <div className='h-[10%]'>
          <Navbar/>
          </div>
          <div className='h-[90%]'>
          <SideBar/>
          <Home />
          </div>
          
        </div>
    } />
     <Route path="/details" element={
        <div className='h-screen'>
        <div className='h-[10%]'>
        <Navbar/>
        </div>
        <div className='h-[90%]'>
        <SideBar/>
        <Detail />
        </div>
        
      </div>
     }/>
    </Routes>
  );
}

export default App;
