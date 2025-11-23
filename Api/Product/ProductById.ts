'use client'
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;
const URL = process.env.NEXT_PUBLIC_SERVER_URL!;

export const getProductById = async (id: number) => {
    try {
        const res = await axios.get(URL + 'api/product/get?id=' + id, {
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