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


    return (
        <>
            <h1>Userprofile</h1>
            {user ? <h1>Welcome {user.name}</h1> : <h1>Welcome</h1>}
            {user.email}
            <Link to={'/'}>Logout</Link>
        </>
    );
}

export default Userprofile;
