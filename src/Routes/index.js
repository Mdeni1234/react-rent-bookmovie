import { Route, Routes } from "react-router-dom";
import Login from "../Auth/Login";
import Dashboard from "../Dashboard";
import ChangePassword from "../Dashboard/ChangePassword";
import FormProfile from "../Dashboard/FormProfile";
import Profile from "../Dashboard/Profile";
import RentalLayout from "../Layout/RentalLayout";
import About from "../PublicPage/About";
import Home from "../PublicPage/Home";
import GenrePublic from "../UserPage/Genre";
import GenreById from "../UserPage/GenreById";
import ItemPublic from "../UserPage/Item";
import ItemList from "../UserPage/ItemList";

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/item/:id" element={<RentalLayout />} />
      <Route path="/item" element={<ItemList />} />
      <Route path="/genre">
        <Route index element={<GenrePublic />} />
        <Route path=":id" element={<GenreById />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/items" element={<ItemPublic />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<FormProfile />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default UserRoute;
