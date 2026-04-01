"use client";
import { useState } from "react";
// fetch users via server action
import { loginUser, fetchAllUsers } from "./actions";

export default function ClientPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [usersList, setUsersList] = useState<any[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await loginUser(username, password);
    if (success) {
      setIsLogged(true);
      const all = await fetchAllUsers();
      setUsersList(all);
    } else {
      alert("Autentificare eșuată! Verifică datele.");
    }
  }

  if (isLogged) {
    return (
      <div className="min-h-screen flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-300">Welcome, {username}!</h1>
        <p className="mb-8">Măsurători de mediu - Platformă Acces</p>
        
        <button onClick={() => setIsLogged(false)} className="bg-red-600 text-white px-4 py-2 rounded mb-8 shadow hover:bg-red-700 transition">Logout</button>

        <div className="w-full max-w-2xl bg-white dark:bg-green-900 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Toți Utilizatorii Înregistrați</h2>
          <ul className="space-y-3">
            {usersList.map((u) => (
              <li key={u.id} className="p-3 bg-gray-50 dark:bg-green-800 rounded shadow-sm flex justify-between">
                <span className="font-medium text-lg">{u.username}</span>
                <span className="text-sm opacity-70">{u.email}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // Comentariu pentru facultate: Formular simplu de login
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-green-900 p-8 rounded-2xl shadow-xl max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Login Sistem Mediu</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input type="text" className="w-full border-2 border-gray-200 dark:border-green-700 p-2 rounded-lg text-black focus:border-green-500 outline-none" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" className="w-full border-2 border-gray-200 dark:border-green-700 p-2 rounded-lg text-black focus:border-green-500 outline-none" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
            Intră în cont
          </button>
        </form>
      </div>
    </div>
  );
}