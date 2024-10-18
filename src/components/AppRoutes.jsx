import React from 'react'
import { BrowserRouter,Route,Router, Routes } from 'react-router-dom'

import Home from '../pages/Home'
import MainPage from '../pages/Main'

import Navbar from './Navbar'


const AppRoutes = () => {
  return (

    <div>

     {/* <Navbar/> */}
     <MainPage/>
     
     {/* <Table/> */}
    </div>

  )
}

export default AppRoutes