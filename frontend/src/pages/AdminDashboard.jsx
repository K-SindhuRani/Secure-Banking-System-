import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminDashboard.css";

function AdminDashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalAccounts: 0,
        totalTransactions: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {

            const res = await api.get("/admin/dashboard");

            setStats(res.data);

        } catch (err) {

            console.log(err);

        }
    };

    return (

        <>
            <AdminSidebar />

            <div className="admin-dashboard">

                <h1 className="admin-title">
                    Admin Dashboard
                </h1>

                <p className="admin-subtitle">
                    Manage users, accounts and banking transactions.
                </p>

                <div className="admin-cards">

                    <div
                        className="admin-card"
                        onClick={() => navigate("/admin/users")}
                    >

                        <div className="admin-icon">
                            👥
                        </div>

                        <h2>Total Users</h2>

                        <h1>{stats.totalUsers}</h1>

                        <p>View Details →</p>

                    </div>

                    <div
                        className="admin-card"
                        onClick={() => navigate("/admin/accounts")}
                    >

                        <div className="admin-icon">
                            🏦
                        </div>

                        <h2>Total Accounts</h2>

                        <h1>{stats.totalAccounts}</h1>

                        <p>View Details →</p>

                    </div>

                    <div
                        className="admin-card"
                        onClick={() => navigate("/admin/transactions")}
                    >

                        <div className="admin-icon">
                            💳
                        </div>

                        <h2>Total Transactions</h2>

                        <h1>{stats.totalTransactions}</h1>

                        <p>View Details →</p>

                    </div>

                </div>

            </div>

        </>

    );

}

export default AdminDashboard;