import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import RentalLayout from "../Layout/RentalLayout";
import About from "../PublicPage/About";
import Home from "../PublicPage/Home";
import ItemPublic from "../UserPage/Item";

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<ItemPublic />} />
      <Route path="/item/:id" element={<RentalLayout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/*" element={<Navigate to="/login" replace={true} />} />
    </Routes>
  );
};

export default PublicRoute;
