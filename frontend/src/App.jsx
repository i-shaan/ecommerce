import React from 'react'
import {Outlet} from 'react-router-dom'

import Navigation from './pages/Auth/Navigation'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const App = () => {
  return (
    <>
    <ToastContainer/>

      <Navigation  />
      {/* Main content here */}
    
      <main className=''>
      <Outlet/>
      
    </main>
      

   

    </>
  )
}

export default App