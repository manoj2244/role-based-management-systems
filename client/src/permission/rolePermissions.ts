// src/permissions/rolePermissions.ts

export interface Permissions {
  canViewUsers: boolean;
  canCreateUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
}

export const rolePermissions: Record<string, Permissions> = {

  admin: {
    canViewUsers: true,
    canCreateUsers: false,
    canEditUsers: true,
    canDeleteUsers: false, 
  },
  super_admin: {
    canViewUsers: true,
    canCreateUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
  },
};
