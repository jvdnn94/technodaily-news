import React from "react";
import { Route, Routes } from "react-router-dom";
import { SingleNews } from "./pages/singleNews/SingleNews";
import { AdminPanel } from "./pages/adminPage/AdminPage";
import { LogIn } from "./pages/logIn/LogIn";
import { Home } from "./pages/home/Home";
import { MainLayOut } from "./component/LayOut/LayOut";
import { ProtectedRoute } from "./component/ProtectedRoute/ProtectedRoute";
import { SearchPage } from "./pages/searchPage/SearchPage";
import { NewsPage } from "./pages/newspage/NewsPage";
import { NewsContextProvider } from "./context/NewsContext";
import { AboutUs } from "./pages/aboutUs/About";
import { ContactPage } from "./pages/contactUs/Contact";
import "./App.css";
import { ScrollToTop } from "./component/scrollToTop/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div>
      {" "}
      <AuthProvider>
        <NewsContextProvider>
          <MainLayOut>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contactUs" element={<ContactPage />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/singlenews/:id" element={<SingleNews />} />
              <Route path="/login" element={<LogIn />} />
              <Route
                path="/adminpage"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "author","editor"]}>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route path="/searchpage" element={<SearchPage />} />
              <Route path="/category/:slug" element={<NewsPage />} />
            </Routes>
          </MainLayOut>
        </NewsContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
