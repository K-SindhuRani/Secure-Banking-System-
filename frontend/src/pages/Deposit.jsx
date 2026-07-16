import Sidebar from "../components/Sidebar";
import "../styles/deposit.css";
import { useState } from "react";
import api from "../api/api";

function Deposit() {

    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");

    const depositMoney = async () => {

        if (!accountNumber || !amount) {
            alert("Fill all fields");
            return;
        }

        try {

            await api.put(`/accounts/deposit/${accountNumber}/${amount}`);

            alert("Deposit Successful");

            setAccountNumber("");
            setAmount("");

        } catch (error) {

            alert("Deposit Failed");

            console.log(error);

        }

    };

    return (

        <>
            <Sidebar />

            <div className="dashboard">

                <h1>Deposit Money</h1>

                <div className="deposit-card">

                    <h3>Deposit Amount</h3>

                    <input
                        type="text"
                        placeholder="Account Number"
                        value={accountNumber}
                        onChange={(e)=>setAccountNumber(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value)}
                    />

                    <button onClick={depositMoney}>
                        Deposit
                    </button>

                </div>

            </div>

        </>

    );

}

export default Deposit;