import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateLayout from "./components/PrivateLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListPage from "./pages/Login";
import {LIST_PATH, DETAIL_PATH, MY_PATH, API_RESOURCE, TITLE, ItemCard, DetailPage, MyOperations } from "./caso.tsx";
import type {Item} from "./caso.tsx"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element = {<Register/>} />
                <Route path="/login" element = {<Login/>} />
                <Route element = {<PrivateLayout/>} /> 
                    <Route path= {LIST_PATH} element = {
                        <ListPage<Item> apiPath= {LIST_PATH} title = {TITLE} detailPath = {DETAIL_PATH} render = { (item) => ItemCard = item } /> } />
                
                    <Route path = {`${LIST_PATH}/:id`} element = {<DetailPage/>} /> 
                    <Route path = {MY_PATH} element = {<DetailPage/>} /> 
                <Route/>
                <Route path = {"*"} element = {<Navigate to={LIST_PATH} replace/>} /> 
            </Routes>
        </BrowserRouter>
    )
}