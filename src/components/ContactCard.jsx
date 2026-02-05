import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const ContactCard = ({ contact }) => {
  const { actions } = useGlobalReducer();

  const handleDelete = () => {
    actions.deleteContact(contact.id);
  };

  return (
    <div className="card mb-3 w-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src={contact.image || "https://placecats.com/300/300"}
              alt={`${contact.name} Image`}
              className="rounded-circle me-4"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
              }}
            />

            <div>
              <h5 className="mb-2">{contact.name}</h5>

              <p className="mb-1">
                <i className="fa-solid fa-location-dot me-2"></i>
                {contact.address || "No address provided"}
              </p>

              <p className="mb-1">
                <i className="fa-solid fa-phone me-2"></i>
                {contact.phone || "No phone provided"}
              </p>

              <p className="mb-0">
                <i className="fa-solid fa-envelope me-2"></i>
                {contact.email || "No email provided"}
              </p>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary">
              <i className="fa-solid fa-pencil"></i>
            </button>

            <button className="btn btn-outline-danger" onClick={handleDelete}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
