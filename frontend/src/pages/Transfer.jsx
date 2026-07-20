import { useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import api from "../api/api";

function Transfer() {

    const [fromAccount, setFromAccount] = useState("");
    const [toAccount, setToAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const transferMoney = async () => {

        if (!fromAccount || !toAccount || !amount) {

            toast.warning("Please fill all fields");

            return;

        }

        if (fromAccount === toAccount) {

            toast.warning("Sender and Receiver accounts cannot be the same");

            return;

        }

        if (Number(amount) <= 0) {

            toast.warning("Amount should be greater than zero");

            return;

        }

        try {

            setLoading(true);

            await api.post("/accounts/transfer", {

                fromAccount,
                toAccount,
                amount

            });

            toast.success("Money Transferred Successfully");

            setFromAccount("");
            setToAccount("");
            setAmount("");

        }

        catch (error) {

            console.log(error);

            if (error.response) {

                if (typeof error.response.data === "string") {

                    toast.error(error.response.data);

                } else {

                    toast.error(
                        error.response.data.message ||
                        "Transfer Failed"
                    );

                }

            } else {

                toast.error("Server not responding");

            }

        }

        finally {

            setLoading(false);

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

                    <button
                        onClick={transferMoney}
                        disabled={loading}
                    >
                        {loading ? "Transferring..." : "Transfer"}
                    </button>

                </div>

            </div>

        </>

    );

}

export default Transfer;