
export function RoleBasedMainRoutes(role: string) {
    switch (role) {
        case "ADMIN": {
            return "/alerts"
        }
        case "DEVELOPER": {
            return "/alerts"
        }
        default: {
            return "/"
        }
    }
}