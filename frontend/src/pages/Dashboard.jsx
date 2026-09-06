import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";


import {
    FaWallet,
    FaMoneyBillWave,
    FaExchangeAlt,
    FaUniversity
} from "react-icons/fa";

function Dashboard(){

    return(

        <>

            <Sidebar/>

            <div className="dashboard">

                <h1>Welcome Back 👋</h1>

                <p>Customer Dashboard</p>

                <div className="cards">

                    <div className="card-box">
                        <FaWallet size={35} color="#0F62FE"/>
                        <div className="card-title">Available Balance</div>
                        <div className="card-value">₹1,24,500</div>
                    </div>

                    <div className="card-box">
                        <FaMoneyBillWave size={35} color="green"/>
                        <div className="card-title">Deposits</div>
                        <div className="card-value">₹35,000</div>
                    </div>

                    <div className="card-box">
                        <FaExchangeAlt size={35} color="#ff9800"/>
                        <div className="card-title">Transfers</div>
                        <div className="card-value">₹22,000</div>
                    </div>

                    <div className="card-box">
                        <FaUniversity size={35} color="#9c27b0"/>
                        <div className="card-title">Accounts</div>
                        <div className="card-value">2</div>
                    </div>

                </div>

                <div className="section">

                    <h2>Recent Transactions</h2>

                    <table className="transaction-table">

                        <thead>

                            <tr>

                                <th>Description</th>
                                <th>Date</th>
                                <th>Amount</th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr>
                                <td>Salary Credit</td>
                                <td>12 Jul 2026</td>
                                <td className="credit">+ ₹25,000</td>
                            </tr>

                            <tr>
                                <td>Electric Bill</td>
                                <td>11 Jul 2026</td>
                                <td className="debit">- ₹1,500</td>
                            </tr>

                            <tr>
                                <td>Transfer to Rahul</td>
                                <td>10 Jul 2026</td>
                                <td className="debit">- ₹4,000</td>
                            </tr>

                            <tr>
                                <td>Interest Credit</td>
                                <td>08 Jul 2026</td>
                                <td className="credit">+ ₹500</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}

export default Dashboard;