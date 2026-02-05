import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const AddContact = () => {
  const { actions } = useGlobalReducer();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actions.addContact(formData);
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h1>Add Contact</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="phone"
          placeholder="Enter phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="address"
          placeholder="Enter address"
          value={formData.address}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100">Save</button>
      </form>
      <Link to="/" className="text-decoration-none mb-3 d-inline-block">
        Or go back to Contacts
      </Link>
    </div>
  );
};
