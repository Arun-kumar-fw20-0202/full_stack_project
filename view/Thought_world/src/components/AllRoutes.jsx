import { Route, Routes } from "react-router-dom"
import { AddPost } from "../pages/AddPost"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Profile } from "../pages/Profile"
import { Register } from "../pages/Register"
import { SingleUser } from "../pages/SingleUser"
import { PrivateRoute } from "./PrivateRoute"
import { SinglePost } from "./SinglePost"

export const  AllRoutes = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-post" element={
                    <PrivateRoute >
                        <AddPost />
                    </PrivateRoute>
                } />
                <Route path="/profile" element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                } />
                <Route path="/user/:id" element={
                    <PrivateRoute>
                        <SingleUser />
                    </PrivateRoute>
                } />
                <Route path={"/post/:id"} element={
                    <PrivateRoute>
                        <SinglePost />
                    </PrivateRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    )
}