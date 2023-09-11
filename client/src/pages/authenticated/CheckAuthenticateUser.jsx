import axios from "axios";
import { useEffect, useState } from "react"
import AdminAuthenticatedApp from "./AdminAuthenticatedApp";
import AuthenticatedApp from "./AuthenticatedApp";

function checkAuthenticateUser() {
    const [user, setUser] = useState(null);
    const checkUser = async () => {
        const result = await axios.get('http://localhost:4000/post')
        setUser(result.data.data.role)
    }
    useEffect(()=>{
        checkUser();
    })

    if(user === 'Admin') {
        return <AdminAuthenticatedApp />
    }
    if(user === 'Users') {
        return <AuthenticatedApp />
    }
    // return (
    //     <>
    //     {user === 'Admin' ? (<AdminAuthenticatedApp />) : <AuthenticatedApp />}
    //     </>
    // )
}

export default checkAuthenticateUser