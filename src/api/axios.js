import axios from "axios";

const API = axios.create({
  baseURL: "https://6a1469706c7db8aac0547a26.mockapi.io",
});

export default API;