import React from "react";
export default function SweetTable({ sweets, onPurchase, onDelete, onRestock }) {
    return (
        <table border="1" width="100%" cellPadding="10">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {sweets.map(s => (
                    <tr key={s.id}>
                        <td>{s.name}</td>
                        <td>{s.category}</td>
                        <td>{s.price}</td>
                        <td>{s.quantity}</td>
                        <td>
                            <button onClick={() => onPurchase(s.id)} disabled={s.quantity === 0}>
                                Buy
                            </button>
                            <button onClick={() => onRestock(s.id)}>Restock</button>
                            <button onClick={() => onDelete(s.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
