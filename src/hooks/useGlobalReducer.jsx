// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"; // Import the reducer and the initial state.

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext();

const url = "https://playground.4geeks.com/contact/";
const slug = "Cath";

// Define a provider component that encapsulates the store and warps it in a context provider to
// broadcast the information throught all the app pages and components.
export function StoreProvider({ children }) {
  // Initialize reducer with the initial state.
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  const actions = {
    ensureAgendaExists: async () => {
      const response = await fetch(url + "agendas/" + slug);

      if (response.ok) return;

      if (response.status === 404) {
        const createResponse = await fetch(url + "agendas/" + slug, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!createResponse.ok) {
          throw new Error("Failed to create agenda");
        }
      }
    },

    getContacts: async () => {
      await actions.ensureAgendaExists();

      const response = await fetch(url + "agendas/" + slug + "/contacts");
      const data = await response.json();

      dispatch({ type: "get_contacts", payload: data.contacts });
    },

    addContact: async (contact) => {
      const response = await fetch(url + "agendas/" + slug + "/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      const newContact = await response.json();

      dispatch({
        type: "add_contact",
        payload: newContact,
      });
    },

    deleteContact: async (id) => {
      const response = await fetch(
        url + "agendas/" + slug + "/contacts/" + id,
        {
          method: "DELETE",
        },
      );

      dispatch({ type: "delete_contact", payload: id });
    },
  };

  // Provide the store and dispatch method to all child components.
  return (
    <StoreContext.Provider value={{ store, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  );
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
  return useContext(StoreContext);
}
