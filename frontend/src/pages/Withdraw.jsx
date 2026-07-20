import Sidebar from "../components/Sidebar";
import "../styles/withdraw.css";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";

function Withdraw() {

    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const withdrawMoney = async () => {

        if (!accountNumber || !amount) {

            toast.warning("Please fill all fields");

            return;
        }

        if (Number(amount) <= 0) {

            toast.warning("Amount should be greater than zero");

            return;
        }

        try {

            setLoading(true);

            await api.put(`/accounts/withdraw/${accountNumber}/${amount}`);

            toast.success("Amount Withdrawn Successfully");

            setAccountNumber("");
            setAmount("");

        } catch (error) {

            console.log(error);

            if (error.response) {

                if (typeof error.response.data === "string") {

                    toast.error(error.response.data);

                } else {

                    toast.error(
                        error.response.data.message ||
                        "Withdrawal Failed"
                    );

                }

            } else {

                toast.error("Server not responding");

            }

        } finally {

            setLoading(false);

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

                    <button
                        onClick={withdrawMoney}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Withdraw"}
                    </button>

                </div>

            </div>

        </>

    );

}

export default Withdraw;