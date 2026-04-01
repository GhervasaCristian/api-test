"use server";

// proxy to admin api since memory is not shared between processes
const API_URL = "http://localhost:3000/api/users";

export async function loginUser(username: string, pass: string) {
  try {
    const res = await fetch(`${API_URL}`);
    if (!res.ok) return false;
    
    // just check if user exists for demo
    const users = await res.json();
    const user = users.find((u: any) => u.username === username);
    
    return !!user;
  } catch (e) {
    console.error("Eroare conectare la API:", e);
    return false;
  }
}

export async function fetchAllUsers() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error("Eroare fetchAllUsers:", e);
    return [];
  }
}