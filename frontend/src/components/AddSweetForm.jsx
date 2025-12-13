import React, { useState } from "react";
import api from "../utils/api";

export default function AddSweetForm({ onAdded }) {
    const [sweet, setSweet] = useState({
        name: "",
        category: "",
        price: "",
        quantity: ""
    });

    const submit = async (e) => {
        e.preventDefault();

        if (!sweet.name || !sweet.category || !sweet.price) {
            alert("All fields required");
            return;
        }

        await api.post("/sweets", {
            ...sweet,
            price: Number(sweet.price),
            quantity: Number(sweet.quantity)
        });

        setSweet({ name: "", category: "", price: "", quantity: "" });
        onAdded();
    };

    return (
        <form onSubmit={submit}>
            <h3>Add Sweet</h3>
            <input placeholder="Name" value={sweet.name} onChange={e => setSweet({ ...sweet, name: e.target.value })} />
            <input placeholder="Category" value={sweet.category} onChange={e => setSweet({ ...sweet, category: e.target.value })} />
            <input placeholder="Price" type="number" value={sweet.price} onChange={e => setSweet({ ...sweet, price: e.target.value })} />
            <input placeholder="Quantity" type="number" value={sweet.quantity} onChange={e => setSweet({ ...sweet, quantity: e.target.value })} />
            <button>Add Sweet</button>
        </form>
    );
}
