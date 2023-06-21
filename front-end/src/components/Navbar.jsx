import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <Link to={'/'}>Home</Link>
            <Link to={'/api/signup'}>SignUp</Link>
            <Link to={'/api/login'}>Login</Link>
        </nav>
    );
}

export default Navbar;