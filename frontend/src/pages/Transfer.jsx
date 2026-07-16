import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/api";

function Transfer() {

    const [fromAccount, setFromAccount] = useState("");
    const [toAccount, setToAccount] = useState("");
    const [amount, setAmount] = useState("");

    const transferMoney = async () => {

        if (!fromAccount || !toAccount || !amount) {
            alert("Fill all fields");
            return;
        }

        try {

            await api.post("/accounts/transfer", {

                fromAccount,
                toAccount,
                amount

            });

            alert("Money Transferred Successfully");

            setFromAccount("");
            setToAccount("");
            setAmount("");

        }

        catch (error) {

            if (error.response?.data) {
                alert(error.response.data);
            } else {
                alert("Transfer Failed");
            }

            console.log(error);

        }

    };

    return (

        <>
            <Sidebar />

            <div className="dashboard">

                <h1>Transfer Money</h1>

                <div className="deposit-card">

                    <h3>Transfer Funds</h3>

                    <input
                        type="text"
                        placeholder="From Account Number"
                        value={fromAccount}
                        onChange={(e) => setFromAccount(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="To Account Number"
                        value={toAccount}
                        onChange={(e) => setToAccount(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <button onClick={transferMoney}>
                        Transfer
                    </button>

                </div>

            </div>

        </>
    );

}

export default Transfer;