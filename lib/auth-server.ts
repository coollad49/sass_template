import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getServerSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

export async function getActiveOrganization() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session?.session?.activeOrganizationId) {
    return null;
  }

  const org = await auth.api.getFullOrganization({
    headers: await headers(),
  });

  return org;
}

export async function getCurrentUserRole() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  let org = null;

  if (session.session.activeOrganizationId) {
    org = await auth.api.getFullOrganization({
      headers: await headers(),
    });
  } else {
    const organizations = await auth.api.listOrganizations({
      headers: await headers(),
    });

    if (organizations && organizations.length > 0) {
      org = await auth.api.getFullOrganization({
        headers: await headers(),
        query: {
          organizationId: organizations[0].id,
        },
      });
    }
  }

  if (!org) {
    return null;
  }

  const member = org.members?.find((m: { userId: string }) => m.userId === session.user.id);
  
  return member?.role || null;
}

export type UserRole = "owner" | "admin" | "member";

export function isAdmin(role: UserRole | null): boolean {
  return role === "owner" || role === "admin";
}
