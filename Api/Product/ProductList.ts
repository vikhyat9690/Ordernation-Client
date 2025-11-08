'use client'
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;
const URL = process.env.NEXT_PUBLIC_SERVER_URL!;

export const getAllProducts = async () => {
    try {
        const res = await axios.get(URL + 'api/products/get', {
            headers: {
                'X-API-KEY': API_KEY,
                'Content-Type': 'application/json'
            }
        })
        return res?.data;
    } catch (error) {
        console.log(error);
    }
}