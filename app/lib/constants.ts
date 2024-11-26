export const URLS = {
    root: "/",
    users: "/users",
    user: (id: string) => `/users/${id}`,
    properties: (id: string) => `/users/${id}/properties`,
    about: "/about",
    pricing: "/pricing",
    todos: "/todos",
    admin: "/admin",
    forms: "/forms/input-and-text-area",
    cssModules: "/css-modules",
  } as const;
  