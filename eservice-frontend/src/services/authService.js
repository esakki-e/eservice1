import axios from "axios";
import { API_URL } from "../config";

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