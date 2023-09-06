import { useState } from "react"
import { useAuth } from "@/contexts/authentication";

function RegisterPageMock() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [age, setAge] = useState(20)
    const { register } = useAuth();

    const handleSubmit = () => {
        console.log(username,password,fullname,age)
        register({
            username,
            password,
            fullname,
            age
        })
    }

    return (
        <>
            <form>
                <label>Username</label>
                <input type="text" id="username" onChange={(event)=> setUsername(event.target.value) } />
                {/* <label>Pass</label> */}
                {/* <input type="text" id="password" onChange={(event)=> setPassword(event.target.value) } />
                <label>Full</label>
                <input type="text" id="fullname" onChange={(event)=> setFullname(event.target.value) } />
                <label>age</label>
                <input type="text" id="age" onChange={(event)=> setAge(event.target.value) } />
                <button>submit</button> */}
            </form>
            <form>
                {/* <label>Username</label>
                <input type="text" id="username" onChange={(event)=> setUsername(event.target.value) } /> */}
                <label>Pass</label>
                <input type="text" id="password" onChange={(event)=> setPassword(event.target.value) } />
                {/* <label>Full</label>
                <input type="text" id="fullname" onChange={(event)=> setFullname(event.target.value) } />
                <label>age</label>
                <input type="text" id="age" onChange={(event)=> setAge(event.target.value) } />
                <button>submit</button> */}
            </form>
            <form onSubmit={handleSubmit}>
                {/* <label>Username</label>
                <input type="text" id="username" onChange={(event)=> setUsername(event.target.value) } />
                <label>Pass</label>
                <input type="text" id="password" onChange={(event)=> setPassword(event.target.value) } />
                <label>Full</label> */}
                <input type="text" id="fullname" onChange={(event)=> setFullname(event.target.value) } />
                <label>age</label>
                <input type="text" id="age" onChange={(event)=> setAge(event.target.value) } />
                <button>submit</button>
            </form>
        </>
        
    )
}

export default RegisterPageMock