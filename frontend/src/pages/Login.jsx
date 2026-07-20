import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        if (!email || !password) {

            toast.warning("Please enter Email and Password");

            return;
        }

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            if (response.data.role) {
                localStorage.setItem("role", response.data.role);
            }

            toast.success("Login Successful");

            setTimeout(() => {

                if (response.data.role === "ADMIN") {

                    navigate("/admin");

                } else {

                    navigate("/dashboard");

                }

            }, 800);

        } catch (error) {

            console.log(error);

            if (error.response) {

                toast.error(
                    error.response?.data?.message ||
                    "Invalid Email or Password"
                );

            } else {

                toast.error("Cannot connect to Backend Server");

            }

        }

    };

    return (

        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">

            <div
                className="card shadow-lg p-5"
                style={{
                    width: "430px",
                    borderRadius: "20px"
                }}
            >

                <h2 className="text-center text-primary fw-bold mb-4">

                    Secure Banking System

                </h2>

                <div className="mb-3">

                    <label className="form-label fw-semibold">

                        Email

                    </label>

                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                <div className="mb-4">

                    <label className="form-label fw-semibold">

                        Password

                    </label>

                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>

                <button
                    className="btn btn-primary w-100"
                    onClick={login}
                >

                    Login

                </button>

            </div>

        </div>

    );

}

export default Login;