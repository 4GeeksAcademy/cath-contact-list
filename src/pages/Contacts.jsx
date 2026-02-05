import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Contacts = () => {
  const { store, actions } = useGlobalReducer();

  console.log("contacts length:", store.contacts?.length, store.contacts);

  useEffect(() => {
    actions.getContacts();
  }, []);

  return (
    <div className="container justify-content-center align-items-center">
      {/* Add contact button */}
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1>Contacts</h1>
        <Link to="/add-contact" className="btn btn-success">
          Add new contact
        </Link>
      </div>

      {store.contacts?.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};
