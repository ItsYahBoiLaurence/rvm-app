export enum Role {
    ADMIN = "Admin",
    VIEWER = "Viewer",
    EDITOR = "Editor"
}


export type ApiKeyUserType = {
    apiKey: string
    name: string
    description: string
    isActive: string
    dateCreated: string
    companyOwner: string
    role: string
    id: string
}
