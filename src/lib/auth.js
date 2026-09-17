import { cookies } from "next/headers";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "vhavahvandana2024";
const SESSION_COOKIE = "kv_admin_session";
const SESSION_SECRET = "kashi-vandana-admin-secret-2024";

/**
 * Validate admin credentials
 */
export function validateCredentials(username, password) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

/**
 * Create a simple session token (base64 encoded)
 */
export function createSessionToken() {
  const payload = {
    role: "admin",
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

/**
 * Verify a session token
 */
export function verifySessionToken(token) {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    if (payload.role !== "admin") return false;
    if (Date.now() > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if current request is authenticated as admin
 * For use in Server Components and Route Handlers
 */
export async function isAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (!session) return false;
  return verifySessionToken(session.value);
}

/**
 * Get session cookie name
 */
export function getSessionCookieName() {
  return SESSION_COOKIE;
}
