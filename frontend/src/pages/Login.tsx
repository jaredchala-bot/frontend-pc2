import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, apiError } from "../services/api";
import { Alert, Field } from "../components/ui";
import { LIST_PATH } from "../caso";

export default function Login() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (ev: SubmitEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (busy) return;
        setError("");
        setBusy(true);
        try {
            const { data } = await api.post<{ token: string }>("/auth/login", form);
            localStorage.setItem("token", data.token); 
            navigate(LIST_PATH, { replace: true });
        } catch (err) {
            const e = apiError(err);
            setError(e.status === 401 ? "Correo o contraseña incorrectos." : e.message);
        }
        finally {setBusy(false);}
    };

    return <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-sm space-y-4 rounded border p-6">
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>

        <Field label="Correo">
        <input name="email" type="email" value={form.email} onChange={onChange} required />
        </Field>

        <Field label="Contraseña">
        <input name="password" type="password" value={form.password} onChange={onChange} required />
        </Field>

        {error && <Alert>{error}</Alert>}

        <button type="submit" disabled={busy}> {busy? "Ingresando":"Entrar"}</button>
        <p>¿No tienes cuenta? <Link to="/register" className="underline">Regístrate</Link></p>
    </form>;
    }