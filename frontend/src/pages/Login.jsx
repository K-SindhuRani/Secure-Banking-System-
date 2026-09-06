import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/login.css";

import bankingImage from "../assets/banking.png";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const login = async () => {

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);

            toast.success("Login Successful");

            if (response.data.role === "ADMIN")
                navigate("/admin");
            else
                navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Invalid Email or Password"
            );

        }

    };

    return (

        <div className="login-page">

            <div className="login-box">

                <h1>Secure Banking System</h1>

                <div className="login-content">

                    <div className="image-side">

                        <img
                            src={bankingImage}
                            alt="Banking"
                        />

                    </div>

                    <div className="form-side">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />

                        <label>Password</label>

                        <div className="password-box">

                            <input
                                type={showPassword ? "text":"password"}
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />

                            <span
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {
                                    showPassword
                                    ? <FaEyeSlash/>
                                    : <FaEye/>
                                }
                            </span>

                        </div>

                        <button onClick={login}>
                            Login
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;