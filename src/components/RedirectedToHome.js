import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function RedirectedToHome({ children }) {
    const { user } = useAuth()

    if(user.isLoggedIn) {
        return <Navigate to = "/"/>
    }

    return children
}