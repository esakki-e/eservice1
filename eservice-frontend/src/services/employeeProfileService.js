import axios from "axios";
import { API_URL } from "../config";

const getToken = () => localStorage.getItem("token");

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getMyProfile = async () => {

    const response = await axios.get(
        `${API_URL}/employees/me`,
        authHeader()
    );

    return response.data;
};

export const updateMyProfile = async (profile) => {

    const response = await axios.put(
        `${API_URL}/employees/me`,
        profile,
        authHeader()
    );

    return response.data;
};

export const uploadProfileImage = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(
        `${API_URL}/employees/me/profile-image`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};