import Sidebar from "../components/Sidebar";
import "../styles/accounts.css";
import { FaUniversity } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "../api/api";

function Accounts() {

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {

        loadAccounts();

    }, []);

    const loadAccounts = async () => {

        try {

            const response = await api.get("/accounts");

            setAccounts(response.data);

        }

        catch (error) {

    console.log("Full Error:", error);

    if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
    }

    alert("Unable to load accounts");

}

    };

    return (

        <>
            <Sidebar />

            <div className="dashboard">

                <h1>My Accounts</h1>

                <div className="account-grid">

                    {

                        accounts.map((account) => (

                            <div
                                className="account-card"
                                key={account.id}
                            >

                                <FaUniversity
                                    size={45}
                                    color="white"
                                />

                                <h3>{account.accountType}</h3>

                                <p>{account.accountNumber}</p>

                                <h2>₹ {account.balance}</h2>

                                <span>{account.status}</span>

                            </div>

                        ))

                    }

                </div>

            </div>

        </>

    );

}

export default Accounts;