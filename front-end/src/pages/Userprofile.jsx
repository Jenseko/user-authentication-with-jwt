import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// --------

const Userprofile = () => {

    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get('/api/verified', { withCredentials: true })
            .then((res) => {
                console.log(res)
                setUser(res.data)
            }).catch((err) => {
                console.error(err)
            })
    }, [])


    const LogoutButton = () => {
        const handleLogout = async () => {
            try {
                await axios.post('/api/logout');
            } catch (error) {
                console.error(error)
            }
        };
    }

    return (
        <>
            <h1>Userprofile</h1>
            {user ? <h1>Welcome {user.name}</h1> : <h1>Welcome</h1>}
            {user.email}
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}

export default Userprofile;
