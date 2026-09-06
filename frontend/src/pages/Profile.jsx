import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/profile.css";
import { toast } from "react-toastify";
import { FaUserAlt, FaCamera } from "react-icons/fa";

function Profile() {

    const [editing, setEditing] = useState(false);

    const [image, setImage] = useState(null);

    const [user, setUser] = useState({

        fullName: "Sindhu Rani",
        email: "sindhu@gmail.com",
        phone: "9876543210",
        account: "456789123456",
        branch: "Chittoor",
        address: "Madanapalle",
        city: "Chittoor",
        pincode: "517001"

    });

    const handleChange = (e) => {

        setUser({

            ...user,

            [e.target.name]: e.target.value

        });

    };

    const changeImage = (e) => {

        if (e.target.files.length > 0) {

            setImage(URL.createObjectURL(e.target.files[0]));

        }

    };

    const saveProfile = () => {

        toast.success("Profile Updated Successfully");

        setEditing(false);

    };

    return (

        <>

            <Sidebar />

            <div className="dashboard">

                <h1>My Profile</h1>

                <div className="profile-card">

                    <div className="profile-banner"></div>

                    <div className="profile-header">

                        <div className="profile-image-container">

                            {

                                image ?

                                (

                                    <img

                                        src={image}

                                        alt="Profile"

                                        className="profile-image"

                                    />

                                )

                                :

                                (

                                    <div className="default-avatar">

                                        <FaUserAlt size={70} />

                                    </div>

                                )

                            }

                            {

                                editing &&

                                <label className="camera-icon">

                                    <FaCamera />

                                    <input

                                        type="file"

                                        hidden

                                        accept="image/*"

                                        onChange={changeImage}

                                    />

                                </label>

                            }

                        </div>

                        <div className="profile-user">

                            <h2>{user.fullName}</h2>

                            <p>Customer</p>

                        </div>

                    </div>

                    <div className="profile-info">

                        <label>Full Name</label>

                        <input

                            name="fullName"

                            value={user.fullName}

                            onChange={handleChange}

                            disabled={!editing}

                        />

                        <label>Email</label>

                        <input

                            value={user.email}

                            disabled

                        />

                        <label>Phone</label>

                        <input

                            name="phone"

                            value={user.phone}

                            onChange={handleChange}

                            disabled={!editing}

                        />

                        <label>Address</label>

                        <input

                            name="address"

                            value={user.address}

                            onChange={handleChange}

                            disabled={!editing}

                        />

                        <label>City</label>

                        <input

                            name="city"

                            value={user.city}

                            onChange={handleChange}

                            disabled={!editing}

                        />

                        <label>Pincode</label>

                        <input

                            name="pincode"

                            value={user.pincode}

                            onChange={handleChange}

                            disabled={!editing}

                        />

                        <label>Account Number</label>

                        <input

                            value={user.account}

                            disabled

                        />

                        <label>Branch</label>

                        <input

                            value={user.branch}

                            disabled

                        />

                    </div>

                    {

                        !editing ?

                        (

                            <button

                                className="edit-btn"

                                onClick={() => setEditing(true)}

                            >

                                Edit Profile

                            </button>

                        )

                        :

                        (

                            <div className="profile-buttons">

                                <button

                                    className="save-btn"

                                    onClick={saveProfile}

                                >

                                    Save Changes

                                </button>

                                <button

                                    className="cancel-btn"

                                    onClick={() => setEditing(false)}

                                >

                                    Cancel

                                </button>

                            </div>

                        )
                    }

                </div>

            </div>

        </>

    );

}

export default Profile;