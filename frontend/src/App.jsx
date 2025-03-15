import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({
    userId: "123456",
    amount: "",
    cardNumber: "",
    cvv: "",
  });

  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/payment/pay", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setResponse(res.data.message);
    } catch (error) {
      setResponse(error.response?.data.message || "Error processing payment");
    }
  };

  return (
    <div className="container">
      <h2>Secure Payment Portal</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="amount" placeholder="Amount" onChange={handleChange} />
        <input type="text" name="cardNumber" placeholder="Card Number" onChange={handleChange} />
        <input type="text" name="cvv" placeholder="CVV" onChange={handleChange} />
        <button type="submit">Pay Now</button>
      </form>
      <p>{response}</p>
    </div>
  );
};

export default App;
