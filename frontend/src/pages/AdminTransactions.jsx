import { useEffect, useState } from "react";
import api from "../api/api";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/users.css";
import { toast } from "react-toastify";

function AdminTransactions() {

    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {

        try {

            const response = await api.get("/transactions");

            setTransactions(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Unable to load transactions.");

        }

    };

    const filteredTransactions = transactions.filter((transaction) =>

        (transaction.fromAccount || "")
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        (transaction.toAccount || "")
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <>

            <AdminSidebar />

            <div className="users-page">

                <h1>Transactions</h1>

                <p
                    style={{
                        color: "#666",
                        marginBottom: "20px"
                    }}
                >
                    Total Transactions :
                    <b> {filteredTransactions.length}</b>
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

                            <th>ID</th>
                            <th>Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredTransactions.length > 0 ?

                            filteredTransactions.map((transaction) => (

                                <tr key={transaction.id}>

                                    <td>{transaction.id}</td>

                                    <td>

                                        <span

                                            className={

                                                transaction.transactionType === "DEPOSIT"

                                                ?

                                                "badge bg-success"

                                                :

                                                transaction.transactionType === "WITHDRAW"

                                                ?

                                                "badge bg-danger"

                                                :

                                                "badge bg-primary"

                                            }

                                        >

                                            {transaction.transactionType}

                                        </span>

                                    </td>

                                    <td>

                                        {transaction.fromAccount || "-"}

                                    </td>

                                    <td>

                                        {transaction.toAccount || "-"}

                                    </td>

                                    <td
                                        style={{
                                            color: "green",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        ₹ {transaction.amount}
                                    </td>

                                    <td>

                                        <span

                                            className={

                                                transaction.status === "SUCCESS"

                                                ?

                                                "badge bg-success"

                                                :

                                                "badge bg-danger"

                                            }

                                        >

                                            {transaction.status}

                                        </span>

                                    </td>

                                    <td>

                                        {

                                            new Date(transaction.transactionDate)

                                            .toLocaleString()

                                        }

                                    </td>

                                </tr>

                            ))

                            :

                            <tr>

                                <td

                                    colSpan="7"

                                    style={{
                                        textAlign: "center",
                                        padding: "25px"
                                    }}

                                >

                                    No Transactions Found

                                </td>

                            </tr>

                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default AdminTransactions;