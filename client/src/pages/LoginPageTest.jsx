import React, { useState } from "react";
import { useAuth } from "@/contexts/authentication";
import { NavbarRegistered } from "@/components/base/Navbar";
import Navbar from "@/components/base/Navbar";

function LoginPageTest() {
    const [username, setUsername] = useState("ploy");
    const [password, setPassword] = useState("1234");
    const { login } = useAuth();
    const auth = useAuth();
    const handleSubmit = (event) => {
        event.preventDefault()
        login({
            username,
            password,
        });
    };

    return (
        <>
        {auth.isAuthenticated ? <NavbarRegistered /> : <Navbar />}
        <h1>asdsssssssssssssssss</h1>
        <form onSubmit={handleSubmit}>
            <button>Submit</button>
        </form>
        </>
    )
}

export default LoginPageTest