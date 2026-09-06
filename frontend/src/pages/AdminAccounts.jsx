import { useEffect, useState } from "react";
import api from "../api/api";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/users.css";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

function AdminAccounts() {

    const [accounts, setAccounts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = async () => {

        try {

            const response = await api.get("/accounts");

            setAccounts(response.data);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load accounts.");

        }

    };

    const deleteAccount = async (accountNumber) => {

        const result = await Swal.fire({

            title: "Delete Account?",

            text: "This account will be permanently deleted.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc3545",

            cancelButtonColor: "#6c757d",

            confirmButtonText: "Delete"

        });

        if (!result.isConfirmed) return;

        try {

            await api.delete(`/accounts/${accountNumber}`);

            toast.success("Account Deleted Successfully");

            loadAccounts();

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to delete account.");

        }

    };

    const blockAccount = async (accountNumber) => {

        try {

            await api.put(`/admin/account/block/${accountNumber}`);

            toast.success("Account Blocked");

            loadAccounts();

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to block account");

        }

    };

    const unblockAccount = async (accountNumber) => {

        try {

            await api.put(`/admin/account/unblock/${accountNumber}`);

            toast.success("Account Activated");

            loadAccounts();

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to activate account");

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

                <p
                    style={{
                        color: "#666",
                        marginBottom: "20px"
                    }}
                >
                    Total Accounts :
                    <b> {filteredAccounts.length}</b>
                </p>

                <input
                    type="text"
                    className="search-box"
                    placeholder="🔍 Search Account Number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <table className="users-table">

                    <thead>

                        <tr>

                            <th>Account No</th>
                            <th>Holder</th>
                            <th>Type</th>
                            <th>Balance</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredAccounts.length > 0 ?

                                filteredAccounts.map((account) => (

                                    <tr key={account.accountNumber}>

                                        <td>{account.accountNumber}</td>

                                        <td>
                                            {account.user?.fullName || "N/A"}
                                        </td>

                                        <td>{account.accountType}</td>

                                        <td
                                            style={{
                                                color: "green",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            ₹ {account.balance}
                                        </td>

                                        <td>

                                            <span

                                                className={
                                                    account.status === "ACTIVE"
                                                        ?
                                                        "badge bg-success"
                                                        :
                                                        "badge bg-danger"
                                                }

                                            >

                                                {account.status}

                                            </span>

                                        </td>

                                        <td>

                                            {

                                                account.status === "ACTIVE"

                                                    ?

                                                    <button
                                                        className="btn btn-warning btn-sm me-2"
                                                        onClick={() =>
                                                            blockAccount(account.accountNumber)
                                                        }
                                                    >
                                                        Block
                                                    </button>

                                                    :

                                                    <button
                                                        className="btn btn-success btn-sm me-2"
                                                        onClick={() =>
                                                            unblockAccount(account.accountNumber)
                                                        }
                                                    >
                                                        Unblock
                                                    </button>

                                            }

                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={() =>
                                                    deleteAccount(account.accountNumber)
                                                }

                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="6"
                                        style={{
                                            textAlign: "center",
                                            padding: "20px"
                                        }}
                                    >

                                        No Accounts Found

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default AdminAccounts;