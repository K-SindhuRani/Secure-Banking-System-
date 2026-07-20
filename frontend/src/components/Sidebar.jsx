import { Link, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Sidebar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (

        <div className="sidebar">

            <h2>SecureBank</h2>

            <Link to="/dashboard">
                <i className="bi bi-house-door"></i>
                Dashboard
            </Link>

            <Link to="/accounts">
                <i className="bi bi-bank"></i>
                Accounts
            </Link>

            {/* CUSTOMER MENU */}
            {role === "CUSTOMER" && (
                <>

                    <Link to="/deposit">
                        <i className="bi bi-cash-stack"></i>
                        Deposit
                    </Link>

                    <Link to="/withdraw">
                        <i className="bi bi-arrow-down-circle"></i>
                        Withdraw
                    </Link>

                    <Link to="/transfer">
                        <i className="bi bi-arrow-left-right"></i>
                        Transfer
                    </Link>

                    <Link to="/mini-statement">
                        <i className="bi bi-clock-history"></i>
                        Mini Statement
                    </Link>

                    <Link to="/statement">
                        <i className="bi bi-file-earmark-text"></i>
                        Statement
                    </Link>

                    <Link to="/profile">
                        <i className="bi bi-person-circle"></i>
                        Profile
                    </Link>

                </>
            )}

            {/* ADMIN MENU */}
            {role === "ADMIN" && (
                <>

                    <Link to="/create-account">
                        <i className="bi bi-plus-circle"></i>
                        Create Account
                    </Link>

                </>
            )}

            <button
                className="btn btn-danger mt-4"
                onClick={logout}
            >
                Logout
            </button>

        </div>

    );

}

export default Sidebar;