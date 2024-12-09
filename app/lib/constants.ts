export const URLS = {
    root: "/",
    users: "/users",
    edit_user: (id: string) => `/users/${id}/edit-user`,
    properties: (id: string) => `/users/${id}/properties`,
    edit: (id: string) => `/property/${id}`,
    property: (userId: string, propertyId: string) => `/users/${userId}/properties/${propertyId}`,    
    edit_property: (userId: string, propertyId: string) => `/users/${userId}/properties/${propertyId}/edit-property`,
    repair: (userId: string, propertyId: string, repairId: string) => `/users/${userId}/properties/${propertyId}/repairs/${repairId}`,
    edit_repair: (userId: string, propertyId: string, repairId: string) => `/users/${userId}/properties/${propertyId}/repairs/${repairId}/edit-repair`,
    about: "/about",
    pricing: "/pricing",
    todos: "/todos",
    admin: "/admin",
    forms: "/forms/input-and-text-area",
    cssModules: "/css-modules",
  } as const;
  