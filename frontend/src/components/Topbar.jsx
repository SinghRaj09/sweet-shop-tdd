import React from "react";
export default function Topbar({ user, logout }) {
    return (
        <div style={{ padding: 15, borderBottom: "1px solid #ccc" }}>
            Welcome, {user?.fullName}
            <button onClick={logout} style={{ float: "right" }}>Logout</button>
        </div>
    );
}
