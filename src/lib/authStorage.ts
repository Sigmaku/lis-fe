// Satu-satunya tempat yang baca/tulis auth ke localStorage.
// Dipakai oleh AuthProvider (state React) dan route guard (sinkron, di luar React).
import type { Profil } from "./dataDummy";

export const AUTH_STORAGE_KEY = "auth.user";

export function getStoredUser(): Profil | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw || raw === "null" || raw === "undefined") return null;
    return JSON.parse(raw) as Profil;
  } catch {
    return null;
  }
}

export function setStoredUser(user: Profil) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } catch {
    /* storage diblokir -> abaikan */
  }
}

export function clearStoredUser() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    /* abaikan */
  }
}

export const isLoggedIn = () => getStoredUser() !== null;
