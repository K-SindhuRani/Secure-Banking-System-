import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/users.css";

function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        axios
            .get("http://localhost:8080/users")
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteUser = (id) => {

        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        axios
            .delete(`http://localhost:8080/users/${id}`)
            .then(() => {

                alert("User Deleted Successfully");

                loadUsers();

            })
            .catch((err) => {
                console.log(err);
                alert("Unable to delete user.");
            });
    };

    const filteredUsers = users.filter((user) => {

        return (
            (user.name || "")
                .toLowerCase()
                .includes(search.toLowerCase()) ||

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

                <input
                    type="text"
                    placeholder="Search by Name or Email..."
                    className="search-box"
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
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredUsers.length > 0 ? (

                            filteredUsers.map((user) => (

                                <tr key={user.id}>

                                    <td>{user.id}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>

                                    <td>

                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="5"
                                    style={{
                                        textAlign: "center",
                                        padding: "20px"
                                    }}
                                >
                                    No Users Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default AdminUsers;