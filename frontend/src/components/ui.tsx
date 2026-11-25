import type { ReactNode} from "react";

export function Field({ label, error, children} : { label: string; error?: string; children: ReactNode }) {
    return <label className="block space-y-1">
        <span className="block text-sm font-medium">{label}</span>
        {children}
        {error && <span className="block text-sm text-red-600">{error}</span>}
    </label>;
}

export function Alert({ children, ok=false }: { children: ReactNode; ok?: boolean }) {
    return <p role = {ok? "status" : "alert"} className = {`rounded-full p-3' ${ok? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`} >
        {children}
    </p>
}

export function Pagination({ page, totalPages, loading, onChange }: {page: number; totalPages: number; loading:boolean; onChange: (p: number) => void;
}) {
    return <nav aria-label="Paginación" className="flex flex-wrap items-center justify-center gap-3">
        <button type="button" disabled={loading || page <= 1} onClick={() => onChange(page - 1)} disabled={loading || page <= 1}>Anterior</button>
        <span>Página {totalPages ? page : 0} de {totalPages}</span>
        <button type="button" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>Siguiente</button>
    </nav>;
}