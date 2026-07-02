import axios from "axios";
import { API_URL } from "../config";

const BASE_URL = `${API_URL}/service-categories`;

export const getCategories = async () => {

    const token = localStorage.getItem("token");

    return axios.get(
        BASE_URL,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

};

export const createCategory = async (category) => {

    const token = localStorage.getItem("token");

    return axios.post(
        BASE_URL,
        category,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

};

export const updateCategory = async (
    id,
    category
) => {

    const token = localStorage.getItem("token");

    return axios.put(
        `${BASE_URL}/${id}`,
        category,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

};
export const getActiveCategories = () =>

    axios.get(

        `${API_URL}/service-categories/active`

    );

export const deleteCategory = async (id) => {

    const token = localStorage.getItem("token");

    return axios.delete(
        `${BASE_URL}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

};