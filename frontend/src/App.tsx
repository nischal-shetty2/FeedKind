import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error404 } from "./Pages/Error404";
import Login from "./Pages/Login";
import SignUpPage from "./Pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import PostItems from "./Pages/PostItems";
import Discount from "./Pages/Discount";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/discount" element={<Discount />} />
        <Route path="/postitems" element={<PostItems />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
