import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, apiError } from "../services/api";
import { Alert, Field } from "../components/ui";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    function validate() {
        const e: Record<string, string> = {};
        const name = form.name.trim();
        if (!name || name.length > 100) e.name = "Nombre obligatorio (máx. 100).";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || form.email.length > 254) e.email = "Correo inválido.";
        if (!/^[ -~]{8,72}$/.test(form.password)) e.password = "Contraseña: 8–72 caracteres ASCII.";
        
        return e;
    };

    async function onSubmit(ev: SubmitEvent<HTMLFormElement>) {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length > 0) return;
        setError("");
        setBusy(true);
        try {
            await api.post("/auth/register", { ...form, name: form.name.trim() });
            navigate("/login");
        } catch (err) { setError(apiError(err).message); }
        finally {setBusy(false);}
    };

    return <form onSubmit={onSubmit} noValidate className="mx-auto mt-10 max-w-sm space-y-4 rounded border p-6">
        <h1 className="text-2xl font-bold">Crear cuenta</h1>

        <Field label="Nombre" error={errors.name}>
            <input name="name" value={form.name} onChange={onChange} />
        </Field>
        
        <Field label="Correo" error={errors.email}>
        <input name="email" type="email" value={form.email} onChange={onChange} />
        </Field>
        
        <Field label="Contraseña" error={errors.password}>
        <input name="password" type="password" value={form.password} onChange={onChange} />
        
        </Field>
        
        {error && <Alert>{error}</Alert>}
        
        <button type="submit" className="w-full">Registrarme</button>
        <p>¿Ya tienes cuenta? <Link to="/login" className="underline">Inicia sesión</Link></p>
    </form>;
}