import axios from "axios";

const API_URL = "http://localhost:8080";

export const login = async (phoneNumber, password) => {

    const response = await axios.post(
        `${API_URL}/auth/login`,
        {
            phoneNumber,
            password
        }
    );

    return response.data;
};