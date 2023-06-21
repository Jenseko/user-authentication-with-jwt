import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// ------------------------------------------


const Signup = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        await axios.post('/api/signup', data)
            .then((res) => {
                console.log(res)
                navigate('/api/login')
            }).catch((err) => {
                console.error(err)
            })
    }

    return (
        <>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" id="name" >Username</label>
                <input type="text" name="name" id="" value={data.name} onChange={(e) => { setData({ ...data, name: e.target.value }) }} />
                <label htmlFor="email" id="email" >Email</label>
                <input type="email" name="email" id="" value={data.email} onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
                <label htmlFor="password" id="password" >Password</label>
                <input type="password" name="password" id="password" value={data.password} onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                <button>Submit</button>
            </form>
            <Link to={'/api/login'}>Are you already a User?</Link>
        </>
    );
}

export default Signup;