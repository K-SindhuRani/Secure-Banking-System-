import Sidebar from "../components/Sidebar";
import "../styles/withdraw.css";
import { useState } from "react";
import api from "../api/api";

function Withdraw() {

    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");

    const withdrawMoney = async () => {

        if (!accountNumber || !amount) {
            alert("Fill all fields");
            return;
        }

        try {

            await api.put(`/accounts/withdraw/${accountNumber}/${amount}`);

            alert("Withdrawal Successful");

            setAccountNumber("");
            setAmount("");

        } catch (error) {

            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Withdrawal Failed");
            }

            console.log(error);

        }

    };

    return (
        <>
            <Sidebar />

            <div className="dashboard">

                <h1>Withdraw Money</h1>

                <div className="withdraw-card">

                    <h3>Withdraw Amount</h3>

                    <input
                        type="text"
                        placeholder="Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <button onClick={withdrawMoney}>
                        Withdraw
                    </button>

                </div>

            </div>

        </>
    );
}

export default Withdraw;