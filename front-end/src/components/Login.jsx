import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const loginHandler = async (e) => {
        e.preventDefault();
        console.log(user)
        await axios.post('/api/login', user)
            .then((res) => {
                console.log(res)
                navigate('/user')
            }).catch((err) => {
                console.error(err)
            })
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={loginHandler}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                <button type="submit">Submit</button>
            </form>
            <Link to={'/api/signup'}>Do you have a valid account? If not, then join this way!</Link>
        </>
    );
}

export default Login;
