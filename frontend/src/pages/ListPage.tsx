import type { ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useFetch } from "../services/api";
import { Alert, Pagination } from "../components/ui";

export type Page<T> = { items: T[]; page: number; size: number; totalItems: number; totalPages: number };

type Props<T> = { apiPath: string; detailPath: string; title : string; render: (item: T) => ReactNode };

export default function ListPage<T extends { id: number }>({ apiPath, title, render }: Props<T>) {
    const [params, setParams] = useSearchParams();
    const raw = Number(params.get("page") ?? "1");
    const page = Number.isInteger(raw) && raw>=1 ? raw: 1;
    const { data, loading, error } = useFetch<Page<T>>(`${path}?page=${page}&size=5`);

    return (
        <section className="space-y-4">
        
        <h1 className="text-2xl font-bold">{title}</h1>
        
        {loading && <p className="text-gray-500">Cargando...</p>}
        {error && <div>
            <Alert>
                {error}
            </Alert>
            <button type="button" onClick={reload}>
                Reintentar
            </button>}
        

        {!loading && !error && data?.items.length === 0 && <p>No hay registros para mostrar.</p>}
        {!loading && !error && <ul className="grid gap-2 sm:grid-cols-2">
            {data?.items.map((item) => (
            <li key={item.id}>
                <Link to={`${DETAIL_PATH}/${item.id}`} className="block h-full rounded border p-3 hover:bg-gray-50">
                {render(item)}
                </Link>
            </li>
            ))}
        </ul>}
        <Pagination page={page} totalPages={data?.totalPages ?? 0} loading = {loading} onChange={(p) => setParams({ page: String(p) })} />

        </section>
    );
}