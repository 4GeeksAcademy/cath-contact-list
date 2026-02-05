export const initialStore = () => {
  return {
    contacts: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_contacts":
      return {
        ...store,
        contacts: action.payload,
      };

    case "get_contacts":
      return {
        ...store,
        contacts: action.payload,
      };

    case "add_contact":
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
      };

    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter(
          (contact) => contact.id !== action.payload,
        ),
      };

    default:
      console.warn("Unknown action:", action.type, action);
      return store;
  }
}
