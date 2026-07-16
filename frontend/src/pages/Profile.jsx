import Sidebar from "../components/Sidebar";
import "../styles/profile.css";
import { FaUserCircle } from "react-icons/fa";

function Profile() {

    return (

        <>
            <Sidebar />

            <div className="dashboard">

                <h1>My Profile</h1>

                <div className="profile-card">

                    <FaUserCircle
                        size={120}
                        color="#0F62FE"
                    />

                    <h2>Sindhu Rani</h2>

                    <p>Customer</p>

                    <div className="profile-info">

                        <p><strong>Email :</strong> sindhu@gmail.com</p>

                        <p><strong>Phone :</strong> +91 9876543210</p>

                        <p><strong>Account :</strong> 456789123456</p>

                        <p><strong>Branch :</strong> Chittoor</p>

                    </div>

                    <button className="btn btn-primary">
                        Edit Profile
                    </button>

                </div>

            </div>

        </>

    );

}

export default Profile;