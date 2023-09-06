import React, { useState } from "react";
import { useAuth } from "@/contexts/authentication";

function LoginPageTest() {
    const [username, setUsername] = useState("ploy");
    const [password, setPassword] = useState("1234");
    const { login } = useAuth();
    const handleSubmit = (event) => {
        event.preventDefault()
        login({
            username,
            password,
        });
    };

    return (
        <>
        <h1>asdsssssssssssssssss</h1>
        <form onSubmit={handleSubmit}>
            <button>Submit</button>
        </form>
        </>
    )
}

export default LoginPageTest