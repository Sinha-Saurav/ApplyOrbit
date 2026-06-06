import React from 'react'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import AuthLayout from './components/AuthLayout'
import ApplicationBoard from './pages/ApplicationBoard'
import Dashboard from './pages/Dashboard'
import HomePage from './pages/HomePage'
import ResumeTailor from './pages/Resume'
import Settings from './pages/Settings'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Verify from './pages/auth/Verify'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return(
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/" element={<Layout />}>
            <Route path="applications" element={
              <ProtectedRoute>
                <ApplicationBoard />
              </ProtectedRoute>
            }/>
            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }/>
            <Route path="resume-tailor" element={
              <ProtectedRoute>
                <ResumeTailor />
              </ProtectedRoute>
            } />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="verify" element={<Verify />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}