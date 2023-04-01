import { Navigate, Route, Routes } from "react-router-dom"
import Genre from "../AdminPage/Genre/Genre"
import AdminHome from "../AdminPage/home"
import ItemForm from "../AdminPage/Item/ItemForm"
import Item from "../AdminPage/Item/Item"
import User from "../AdminPage/ListUser/User"
import GenreForm from "../AdminPage/Genre/GenreForm"
import ItemGenre from "../AdminPage/Item/ItemGenre"
import ListRental from "../AdminPage/ListRental/ListRental"
import ListPayment from "../AdminPage/ListPayment/ListPayment"
import UserProfile from "../AdminPage/ListUser/UserProfile"

const AdminRoute = () => {
    return (
        <Routes>
            <Route path="admin"  >
                <Route index element={<AdminHome /> } />
                <Route path="user" element={<User />} />
                <Route path="user-profile/:id" element={<UserProfile/>}/>
                <Route path="rental" element={<ListRental/>}/>
                <Route path="payment" element={<ListPayment/>}/>
                <Route path="/admin/item">
                    <Route index element={<Item />} />
                    <Route path="form" element={<ItemForm />} />
                    <Route path="form/:id" element={<ItemForm />} />
                    <Route path="form/:id/set-genre" element={<ItemGenre />} />
                </Route>
                <Route path="genre" >
                    <Route index element={<Genre />} />
                    <Route path="form" element={<GenreForm />} />
                    <Route path="form/:id" element={<GenreForm />} />
                </Route>
            </Route>
            <Route path="/*" element={<Navigate to='/admin' replace={true}  />}/>
        </Routes>
    )
}

export default AdminRoute