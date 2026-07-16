import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/api";
import "../styles/dashboard.css";

function AdminDashboard() {

    const [users, setUsers] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const userRes = await api.get("/users");

            const accountRes = await api.get("/accounts");

            const transactionRes = await api.get("/transactions");

            setUsers(userRes.data);
            setAccounts(accountRes.data);
            setTransactions(transactionRes.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <>
            <Sidebar />

            <div className="dashboard">

                <h1>Admin Dashboard</h1>

                <div className="account-grid">

                    <div className="account-card">
                        <h3>Total Users</h3>
                        <h1>{users.length}</h1>
                    </div>

                    <div className="account-card">
                        <h3>Total Accounts</h3>
                        <h1>{accounts.length}</h1>
                    </div>

                    <div className="account-card">
                        <h3>Total Transactions</h3>
                        <h1>{transactions.length}</h1>
                    </div>

                </div>

                <br /><br />

                <h3>Users</h3>

                <table className="table table-bordered">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((u) => (

                            <tr key={u.id}>

                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                <br />

                <h3>Accounts</h3>

                <table className="table table-bordered">

                    <thead className="table-dark">

                        <tr>

                            <th>Account No</th>
                            <th>Type</th>
                            <th>Balance</th>

                        </tr>

                    </thead>

                    <tbody>

                        {accounts.map((a) => (

                            <tr key={a.id}>

                                <td>{a.accountNumber}</td>
                                <td>{a.accountType}</td>
                                <td>₹ {a.balance}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                <br />

                <h3>Transactions</h3>

                <table className="table table-bordered">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Account</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {transactions.map((t) => (

                            <tr key={t.id}>

                                <td>{t.id}</td>
                                <td>{t.accountNumber}</td>
                                <td>{t.type}</td>
                                <td>₹ {t.amount}</td>
                                <td>{t.status}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default AdminDashboard;