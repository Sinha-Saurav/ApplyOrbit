import React from 'react'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Layout from './components/Layout'
import ApplicationBoard from './pages/ApplicationBoard'

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="applications" element={<ApplicationBoard />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}