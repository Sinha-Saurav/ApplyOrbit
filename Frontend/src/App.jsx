import React from 'react'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Layout from './components/Layout'
import ApplicationBoard from './pages/ApplicationBoard'
import Dashboard from './pages/Dashboard'
import { AppProvider } from './context/AppContext'

export default function App(){
  return(
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="applications" element={<ApplicationBoard />}/>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}