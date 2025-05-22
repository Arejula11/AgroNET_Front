import { defineMiddleware } from "astro/middleware";
import { Url } from "./global/url";

export const onRequest = defineMiddleware(async (context, next) => {
    // Obtén las cookies del usuario
    const user = context.cookies.get("user");
    const token = context.cookies.get("token");
    const pathname = context.request.url.split("/").pop();

    const urlToBlock = [
        "editar-perfil",
        "foros",
        "mapa",
        "mercado",
        "registerParcel",
        "admin",
        "admin/usuarios",
        "admin/foros",
        "admin/mercado",
        "admin/mensajes",
        "admin/estadisticas",
        "admin/foro/*",
        "admin/foro/nuevo",
        "admin/usuarios/bloqueados",
        "foro/*",
        "mercado/*",
        "mercado/comparador",
        "usuario/*",
        "parcela/*",
    ];

    // Get the pathname without query params and leading slash
    const path = new URL(context.request.url).pathname.replace(/^\/+/, '');

    // Helper to match wildcards
    function matchesBlockedUrl(path: string, patterns: string[]): boolean {
        return patterns.some(pattern => {
            if (pattern.endsWith('/*')) {
                const base = pattern.slice(0, -2);
                return path.startsWith(base + '/');
            }
            return path === pattern;
        });
    }
    if (!matchesBlockedUrl(path, urlToBlock)) {
        return next();
    }
    if (user && token) {
        const userData = user ? JSON.parse(user.value || '{}') : null;
        const isBlocked = userData?.isBlocked;
        if(!userData?.isAdmin && path.includes("admin")) {
            console.log("No tienes permisos para acceder a esta página");
            return new Response("Forbidden", { status: 403 });
        }

        if (isBlocked) {
            return context.redirect("/bloqueado");
        }
    } else {
        console.log("No hay token o usuario");
        return context.redirect("/login");
    }

    return next();
});