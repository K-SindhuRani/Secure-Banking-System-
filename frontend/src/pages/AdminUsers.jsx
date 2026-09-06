import { useEffect, useState } from "react";
import api from "../api/api";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/users.css";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const response = await api.get("/users");

            setUsers(response.data);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load users.");

        }

    };

    const deleteUser = async (id) => {

        const result = await Swal.fire({

            title: "Delete User?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc3545",

            cancelButtonColor: "#6c757d",

            confirmButtonText: "Delete",

            cancelButtonText: "Cancel"

        });

        if (!result.isConfirmed) return;

        try {

            await api.delete(`/admin/user/${id}`);

            toast.success("User Deleted Successfully");

            loadUsers();

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to delete user.");

        }

    };

    const filteredUsers = users.filter((user) => {

        return (

            (user.fullName || "")
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            (user.email || "")
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    });

    return (

        <>

            <AdminSidebar />

            <div className="users-page">

                <h1>Users Management</h1>

                <p
                    style={{
                        color: "#666",
                        marginBottom: "20px"
                    }}
                >
                    Total Users :
                    <b> {filteredUsers.length}</b>
                </p>

                <input

                    type="text"

                    className="search-box"

                    placeholder="🔍 Search by Name or Email"

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                />

                <table className="users-table">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredUsers.length > 0 ?

                                filteredUsers.map((user) => (

                                    <tr key={user.id}>

                                        <td>{user.id}</td>

                                        <td>{user.fullName}</td>

                                        <td>{user.email}</td>

                                        <td>

                                            <span

                                                className={
                                                    user.role === "ADMIN"
                                                        ?
                                                        "badge bg-danger"
                                                        :
                                                        "badge bg-primary"
                                                }

                                            >

                                                {user.role}

                                            </span>

                                        </td>

                                        <td>

                                            <span

                                                className={
                                                    user.status === "ACTIVE"
                                                        ?
                                                        "badge bg-success"
                                                        :
                                                        "badge bg-secondary"
                                                }

                                            >

                                                {user.status}

                                            </span>

                                        </td>

                                        <td>

                                            <button

                                                className="delete-btn"

                                                onClick={() =>
                                                    deleteUser(user.id)
                                                }

                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td

                                        colSpan="6"

                                        style={{
                                            textAlign: "center",
                                            padding: "25px"
                                        }}

                                    >

                                        No matching users found.

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default AdminUsers;