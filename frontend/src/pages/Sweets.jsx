import { useEffect, useState } from "react";
import { getSweets } from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Sweets() {
  const [sweets, setSweets] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const fetchSweets = async () => {
      const data = await getSweets(token);
      if (Array.isArray(data)) {
        setSweets(data);
      } else {
        setError(data.error || "Failed to load sweets");
      }
    };

    fetchSweets();
  }, [token]);

  if (!token) {
    return <p>Please login to view sweets.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sweets</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {sweets.map((sweet) => (
          <li key={sweet.id}>
            {sweet.name} – ₹{sweet.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
