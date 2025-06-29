import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("views/home.tsx"), route("*", "views/404.tsx")] satisfies RouteConfig;
