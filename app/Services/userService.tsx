import axios from "axios"

const API_BASE_URL = "http://codonnier.tech/ravi/learning/dev"; 

export const postRequest = async (endPoint: any, payload: any, headers?: Record<string, string>) => {
 try {
    const response = await axios.post(`${API_BASE_URL}${endPoint}`, payload, {
        headers: {
            "Content-Type": "application/json",
            ...headers,
        }
    })
    return response.data
 } catch (error) {
    throw error;
 }
}

export const getRequest = async (endPoint: string) => {
    const respons = await axios.get(`${API_BASE_URL}${endPoint}`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    return respons.data
}