import { Navigate, Route, Routes } from 'react-router'
// pages
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import NotificationPage from "./pages/NotificationPage.jsx"
import CallPage from "./pages/CallPage.jsx"
import ChatPage from "./pages/ChatPage.jsx"
import OnboardingPage from './pages/OnboardingPage.jsx'

import { Toaster } from 'react-hot-toast'

import PageLoader from './components/PageLoader.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.js'



const App = () => {

  const {authUser,isLoading} = useAuthUser();
  const {theme} = useThemeStore()

  const isAuthenticated = Boolean(authUser);
  const isOnBoarded = authUser?.isOnBoarded;

  
  if(isLoading) return <PageLoader />
  
  return ( 
  <div className="h-screen" data-theme={theme}>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={isAuthenticated && isOnBoarded ?(
          <Layout showSidebar={true}>
            <HomePage />
          </Layout>

        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )} />
        {/* Signup page */}
        <Route 
          path="/signup" 
          element={
            !isAuthenticated ? <SignUpPage  /> : <Navigate to={isOnBoarded ? "/" : "/onboarding"} />
          } 
        />
        {/* Login page */}
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? <LoginPage />  : <Navigate to={isOnBoarded ? "/" : "/onboarding"} />
          } 
        />
        {/* Notification page */}
        <Route path="/notification" element={ isAuthenticated && isOnBoarded ? (
          <Layout showSidebar={true}>
            <NotificationPage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )} />

        {/* Call page */}
        <Route path="/call/:id" element={isAuthenticated && isOnBoarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )} />
        {/* Chat page */}
        <Route path="/chat/:id" element={isAuthenticated && isOnBoarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )} />


        {/* Onboarding page */}
        <Route path="/onboarding" element={
            isAuthenticated ? (
              !isOnBoarded ? (
               <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
            <Navigate to="/login" />
          )} 
        />
      </Routes>
      <Toaster />
    </div>
  )
};

export default App