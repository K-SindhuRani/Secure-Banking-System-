import { useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import api from "../api/api";

function CreateAccount() {

    const [userId, setUserId] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountType, setAccountType] = useState("SAVINGS");
    const [balance, setBalance] = useState("");

    const createAccount = async () => {

        if (!userId || !accountNumber || !balance) {
            toast.warning("Please fill all fields");
            return;
        }

        try {

            const response = await api.post(`/accounts/user/${userId}`, {

                accountNumber,
                accountType,
                balance

            });

            console.log(response.data);

            toast.success("Account Created Successfully");

            setUserId("");
            setAccountNumber("");
            setAccountType("SAVINGS");
            setBalance("");

        } catch (error) {

            console.log(error);

            if (error.response) {

                if (typeof error.response.data === "string") {

                    toast.error(error.response.data);

                } else {

                    toast.error(
                        error.response.data.message ||
                        "Unable to create account"
                    );

                }

            } else {

                toast.error("Server not responding");

            }

        }

    };

    return (

        <>
            <Sidebar />

            <div className="dashboard">

                <h1>Create Account</h1>

                <div className="deposit-card">

                    <input
                        type="number"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />

                    <select
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                    >
                        <option value="SAVINGS">SAVINGS</option>
                        <option value="CURRENT">CURRENT</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Opening Balance"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                    />

                    <button onClick={createAccount}>
                        Create Account
                    </button>

                </div>

            </div>

        </>

    );

}

export default CreateAccount;