import React from 'react';
import { Route, Routes, } from 'react-router-dom';
import { SingleNews } from './pages/singleNews/SingleNews';
import { AdminPanel } from './pages/adminPage/AdminPage';
import { LogIn } from './pages/logIn/LogIn';
import { Home } from './pages/home/Home';
import { Navbar } from './component/navbar/Navbar';
import { MainLayOut } from './component/LayOut/LayOut';
import { ProtectedRoute } from './component/ProtectedRoute/ProtectedRoute';
import { SearchPage } from './pages/searchPage/SearchPage';
import { NewsPage } from './pages/newspage/NewsPage';
import {NewsContextProvider}from './context/NewsContext'
import './App.css'

function App() {

  return (
    <div>
    <NewsContextProvider>
      <MainLayOut >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/singlenews/:id' element={<SingleNews />} />
          <Route path='/login' element={<LogIn />} />
          <Route
            path="/adminpage"
            element={
              <ProtectedRoute allowedRoles={["administrator", "author"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/category/:slug" element={<NewsPage />} />

        </Routes>
      </MainLayOut>
      </NewsContextProvider>
    </div>
  )

}

export default App;
