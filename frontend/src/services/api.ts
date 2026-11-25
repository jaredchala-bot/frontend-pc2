import axios from "axios";
import { useEffect, useState } from "react";
import type { ApiErrorBody } from "../types";


const HOST = import.meta.env.VITE_URL_LOCAL || "https://salaestudio-api.aaron-navarro.workers.dev";
export const api = axios.create({ baseURL: HOST.replace(/\/$/, ""), timeout: 15000 });


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
        if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }
        return config;
    });

api.interceptors.response.use(
    response => response,
    error => {
    if (error.response?.status === 401 && error.startsWith("/auth")) {
        localStorage.removeItem("token");
        window.location.replace("/login");
    }
        return Promise.reject(error);
    }
);

export function apiError(err: unknown) {
    if (axios.isAxiosError<ApiErrorBody>(err)) { 
        return {
            status: err.response?.status ?? 0,
            code: err.response?.data?.code ?? "",
            message: err.response?.data?.message ?? (err.response ? `HTTP ${err.response.status}` : "No se pudo conectar a la API."),
        };
    }
    return { status: 0, code: "", message: "Error inesperado." };
}
//ahora delaramos un hook
export function useFetch<T>(url: string | null) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(url !== null);
    const [error, setError] = useState("");
    const [version, setVersion] = useState(0);

    useEffect(() => {
        if (url === null) {setData(null); setLoading(false); setError(""); return;}
        let ignore = false; 
        setData(null);
        setLoading(true);
        setError("");
        api.get<T>(url)
            .then((res) => { if (!ignore) setData(res.data); })
            .catch((err) => { if (!ignore) setError(apiError(err).message); })
            .finally(() => { if (!ignore) setLoading(false); });
        return () => { ignore = true; }; 
    }, [url, version]);

    return { data, loading, error, reload: () => setVersion(v => v + 1) };
    }
