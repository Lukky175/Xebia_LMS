# Spring Boot Permissions Contract

This frontend reads and writes role access through `src/services/permissionsApi.js`.
The backend team should implement the shared source of truth in Spring Boot so permissions persist across restarts, browsers, and environments.

## Frontend Environment

- Set `VITE_BACKEND_URL` to the Spring Boot base URL.
- If it is not set, the frontend falls back to `localStorage` only for local development.

## Recommended Spring Boot API

Use a dedicated controller, service, and repository-backed persistence model.

### Controller

```java
@RestController
@RequestMapping("/api/permissions")
public class PermissionController {

    private final PermissionService permissionService;

    public PermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping
    public PermissionMapResponse getPermissions() {
        return permissionService.getPermissions();
    }

    @PutMapping("/{roleId}")
    public PermissionMapResponse updateRolePermissions(
            @PathVariable String roleId,
            @RequestBody UpdateRolePermissionsRequest request
    ) {
        return permissionService.updateRolePermissions(roleId, request);
    }

    @PostMapping("/reset")
    public PermissionMapResponse resetPermissions() {
        return permissionService.resetPermissions();
    }
}
```

### DTOs

```java
public class PermissionMapResponse {
    private Map<String, List<String>> permissions;
}

public class UpdateRolePermissionsRequest {
    private String roleId;
    private List<String> permissions;
    private Map<String, List<String>> permissionsMap;
}
```

### Service behavior

- `GET /api/permissions` returns the full role-to-path map.
- `PUT /api/permissions/{roleId}` updates one role and returns the full refreshed map.
- `POST /api/permissions/reset` restores the default map and returns the full refreshed map.
- Persist data in a database table, not in memory, so it survives restarts and is shared across browsers.

### Persistence model suggestion

Either of these approaches works:

- A `role_permissions` table with columns like `role_id`, `permission_path`, `enabled`.
- A single `permissions` table or JSON column storing the full role-to-path map.

## Expected JSON Response

The frontend accepts either of these shapes:

```json
{
  "permissions": {
    "admin": ["/dashboard", "/dashboard/users"],
    "trainer": ["/dashboard", "/dashboard/courses"],
    "student": ["/dashboard"]
  }
}
```

or directly:

```json
{
  "admin": ["/dashboard", "/dashboard/users"],
  "trainer": ["/dashboard", "/dashboard/courses"],
  "student": ["/dashboard"]
}
```

## Important Rules

- `superadmin` should remain bypassed in the frontend to prevent lockouts.
- Sidebar visibility and route guards both use the same permissions source.
- The default permission seed currently lives in `src/services/permissionsApi.js` and can be mirrored in the backend seed data.

## Backend Notes

- Add validation so the backend never removes critical access from admin/superadmin if your product needs guardrails.
- If Spring Security is used, keep these permission records separate from authentication roles so the UI can change access without redeploying the app.
- Return a consistent response after every update so the frontend can refresh immediately.
