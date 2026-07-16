import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/api";

function MiniStatement() {

    const [accountNumber, setAccountNumber] = useState("");
    const [transactions, setTransactions] = useState([]);

    const getMiniStatement = async () => {

        if (!accountNumber) {
            alert("Enter Account Number");
            return;
        }

        try {

            const response = await api.get(
                `/transactions/mini-statement/${accountNumber}`
            );

            setTransactions(response.data);

        } catch (error) {

            alert("Unable to fetch Mini Statement");
            console.log(error);

        }

    };

    return (

        <>
            <Sidebar />

            <div className="dashboard">

                <h1>Mini Statement</h1>

                <div className="deposit-card">

                    <input
                        type="text"
                        placeholder="Enter Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />

                    <button onClick={getMiniStatement}>
                        View Mini Statement
                    </button>

                </div>

                <br />

                <table className="table table-bordered table-striped">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {transactions.map((t) => (

                            <tr key={t.id}>

                                <td>{t.id}</td>
                                <td>{t.type}</td>
                                <td>₹ {t.amount}</td>
                                <td>{t.transactionDate}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default MiniStatement;