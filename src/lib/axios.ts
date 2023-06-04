import axios from "axios";

export const api = axios.create({
  baseURL: "https://96c4-187-19-116-84.ngrok-free.app/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "'http://127.0.0.1:5173",
    "Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS",
  }
})
