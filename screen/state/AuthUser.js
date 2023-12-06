// Define el store
import create from "zustand";

const DataUserAuth = create((set) => ({
  TokenAuth: "",
  DataUser: [],
  setTokenAuth: (token) => set(() => ({ TokenAuth: token })),
  setDataUser: (data) => set(() => ({ DataUser: data })),
  logout: () => set({ TokenAuth: "", DataUser: [] }), // Nueva función logout para cerrar sesión
}));

export default DataUserAuth;
