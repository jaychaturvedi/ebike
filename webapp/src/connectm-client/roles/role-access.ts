
export function RoleBasedMainRoutes(role: string) {
    switch (role) {
        case "ADMIN": {
            return "/alerts"
        }
        case "DEVELOPER": {
            return "/alerts"
        }
        case "MIS": {
          return "/mis"
      }
        default: {
            return "/"
        }
    }
}