/**
 * Miejsce na podmianę na realny odczyt z DB. Tutaj prawie cały plik do zmiany
 */

type AppUser = { id: string; email: string; name?: string; passwordHash?: string };

const MOCK = process.env.MOCK_AUTH === "true";

/**
 * W trybie MOCK – prosty, jawny użytkownik testowy.
 * email: demo@demo.com, hasło: demo123
 */
const MOCK_USER: AppUser = {
  id: "mock-user-1",
  email: "demo@demo.com",
  name: "Demo User",
  // Password trzymamy tu jawnie tylko na czas dev 
};

export async function validateUser(email: string, password: string): Promise<AppUser | null> {
  if (MOCK) {
    if (email === MOCK_USER.email && password === "demo123") return MOCK_USER;
    return null;
  }

  throw new Error(
    "Realna walidacja użytkownika nie jest jeszcze podłączona."
  );
}
