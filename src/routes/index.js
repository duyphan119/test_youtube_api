import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import OAuthPage from '../pages/OAuthPage'
import SearchResultPage from '../pages/SearchResultPage'
import WatchPage from '../pages/WatchPage'

const routes = () => {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/search" element={<SearchResultPage />} />
         <Route path="/oauth/success" element={<OAuthPage />} />
         <Route path="/watch" element={<WatchPage />} />
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   )
}

export default routes