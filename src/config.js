export const api =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://audiosphere-backend.herokuapp.com";
