import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { LIST_PATH, MY_PATH, TITLE } from "../caso";

export default function PrivateLayout() {
    const navigate = useNavigate();
    if (!localStorage.getItem("token")) return <Navigate to="/login" replace />;

    function logout() {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    return <div className="mx-auto max-w-3xl space-y-4 p-4">
    <header className="flex flex-wrap items-center justify-between border-b pb-3">
        <Link to={LIST_PATH} className="text-lg font-bold">{TITLE}</Link>
        <Link to={MY_PATH} className="text-lg font-bold">Mis operaciones</Link>
        <button onClick={logout}>Cerrar sesión</button>
    </header>
    <Outlet />
    </div>;
}