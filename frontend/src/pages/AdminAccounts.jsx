import { useEffect, useState } from "react";
import api from "../api/api";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/users.css";

function AdminAccounts() {

    const [accounts, setAccounts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = async () => {

        try {

            const response = await api.get("/accounts");

            console.log(response.data);

            setAccounts(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load accounts");

        }

    };

    const deleteAccount = async (accountNumber) => {

        if (!window.confirm("Delete this account?")) return;

        try {

            await api.delete(`/accounts/${accountNumber}`);

            alert("Account Deleted Successfully");

            loadAccounts();

        } catch (error) {

            console.log(error);

            alert("Unable to delete account");

        }

    };

    const filteredAccounts = accounts.filter((account) =>

        account.accountNumber
            ?.toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <>

            <AdminSidebar />

            <div className="users-page">

                <h1>Accounts Management</h1>

                <input
                    type="text"
                    className="search-box"
                    placeholder="Search Account Number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <table className="users-table">

                    <thead>

                        <tr>

                            <th>Account Number</th>
                            <th>Type</th>
                            <th>Balance</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredAccounts.map((account) => (

                                <tr key={account.accountNumber}>

                                    <td>{account.accountNumber}</td>

                                    <td>{account.accountType}</td>

                                    <td>₹ {account.balance}</td>

                                    <td>{account.status}</td>

                                    <td>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                deleteAccount(account.accountNumber)
                                            }
                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default AdminAccounts;