import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            // Store role only if backend sends it
            if (response.data.role) {
                localStorage.setItem("role", response.data.role);
            }

            if (response.data.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }

        }
        catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data.message || "Invalid Email or Password");
            } else {
                alert("Cannot connect to backend.");
            }

        }

    };

    return (

        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">

            <div
                className="card shadow p-5"
                style={{ width: "420px", borderRadius: "20px" }}
            >

                <h2 className="text-center text-primary mb-4">
                    Secure Banking System
                </h2>

                <div className="mb-3">

                    <label className="form-label">
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

                    <label className="form-label">
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