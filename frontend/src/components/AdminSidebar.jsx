import { Link, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

function AdminSidebar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (

        <div className="sidebar">

            <h2>SecureBank</h2>

            <Link to="/admin">
                Dashboard
            </Link>

            <Link to="/admin/users">
                Users
            </Link>

            <Link to="/admin/accounts">
                Accounts
            </Link>

            <Link to="/admin/transactions">
                Transactions
            </Link>

            <Link to="/create-account">
                Create Account
            </Link>

            <button
                className="btn btn-danger mt-4"
                onClick={logout}
            >
                Logout
            </button>

        </div>

    );

}

export default AdminSidebar;