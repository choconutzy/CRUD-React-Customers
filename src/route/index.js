import React from "react";
import {Routes, Route} from "react-router-dom"
import Dashboard from "../page/dashboard";
import Login from "../page/login";

export default function AppRoutes() {
    return (
        <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="dashboard" element={<Dashboard/>}/>
        </Routes>
    )
}