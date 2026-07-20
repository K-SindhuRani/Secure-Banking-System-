import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Accounts from "./pages/Accounts";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";
import MiniStatement from "./pages/MiniStatement";
import Statement from "./pages/Statement";
import Profile from "./pages/Profile";
import CreateAccount from "./pages/CreateAccount";
import AdminUsers from "./pages/AdminUsers";
import AdminAccounts from "./pages/AdminAccounts";
import AdminTransactions from "./pages/AdminTransactions";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/accounts" element={<Accounts />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/mini-statement" element={<MiniStatement />} />
        <Route path="/statement" element={<Statement />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/create-account" element={<CreateAccount />} />

        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/accounts" element={<AdminAccounts />} />
        <Route path="/admin/transactions" element={<AdminTransactions />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;