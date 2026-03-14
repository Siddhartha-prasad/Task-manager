import axios from "axios";

const API= axios.create({
    baseURL: "https://task-manager-fa5e.onrender.com"
});

export default API;