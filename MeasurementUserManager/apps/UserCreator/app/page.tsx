"use client";
import { useState, useEffect } from "react";

// rest api test panel
export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });
  const [responseLog, setResponseLog] = useState<any>(null);
  
  // GET /api/users
  const handleGetAll = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setResponseLog({ status: res.status, route: "GET /api/users", data });
    if (res.ok) setUsers(data);
  };

  useEffect(() => {
    handleGetAll(); // fetch on mount
  }, []);

  // GET /api/users/:id
  const handleGetById = async () => {
    if (!selectedUserId) return alert("Selectează un user din listă!");
    const res = await fetch(`/api/users/${selectedUserId}`);
    const data = await res.json();
    setResponseLog({ status: res.status, route: `GET /api/users/${selectedUserId}`, data });
  };

  // POST /api/users
  const handlePost = async () => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    setResponseLog({ status: res.status, route: "POST /api/users", data });
    if (res.ok) handleGetAll();
  };

  // PUT /api/users/:id
  const handlePut = async () => {
    if (!selectedUserId) return alert("Selectează un user din listă!");
    // Trimitem tot ce avem în form, putând modifica orice atribut!
    const res = await fetch(`/api/users/${selectedUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    setResponseLog({ status: res.status, route: `PUT /api/users/${selectedUserId}`, data });
    if (res.ok) handleGetAll();
  };

  // DELETE /api/users/:id
  const handleDelete = async () => {
    if (!selectedUserId) return alert("Selectează un user din listă!");
    const res = await fetch(`/api/users/${selectedUserId}`, { method: "DELETE" });
    let data = null;
    if (res.status !== 204) {
      data = await res.json();
    }
    setResponseLog({ status: res.status, route: `DELETE /api/users/${selectedUserId}`, data: data || "No Content (204)" });
    if (res.ok) {
      setSelectedUserId("");
      handleGetAll();
    }
  };

  // Când selectăm un user cu radio button, populăm formularele pentru a putea fi ușor de editat via PUT
  const onSelectUser = (u: any) => {
    setSelectedUserId(u.id);
    setFormData({ username: u.username || "", email: u.email || "", password: u.password || "" });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 flex flex-col md:flex-row gap-8">
      {/* Coloana stânga: Lista cu radio buttons */}
      <div className="w-full md:w-1/2 space-y-4">
        <h1 className="text-3xl font-bold mb-6">REST API - Users</h1>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg h-[400px] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Lista Utilizatori</h2>
          {users.length === 0 ? (
            <p className="text-sm opacity-50">Niciun utilizator.</p>
          ) : (
            <ul className="space-y-3">
              {users.map(u => (
                <li key={u.id} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded shadow-sm border dark:border-gray-600">
                  <input 
                    type="radio" 
                    name="userSelection" 
                    id={`user-${u.id}`}
                    checked={selectedUserId === u.id}
                    onChange={() => onSelectUser(u)}
                    className="w-5 h-5 cursor-pointer accent-blue-600"
                  />
                  <label htmlFor={`user-${u.id}`} className="cursor-pointer flex-1">
                    <span className="font-bold block">{u.username}</span>
                    <span className="text-xs opacity-70 block">ID: {u.id} • {u.email}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Coloana dreapta: Controale REST */}
      <div className="w-full md:w-1/2 space-y-6">
        <div className="bg-white dark:bg-gray-900 border p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Payload (FormData)</h2>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div>
              <label className="block mb-1 opacity-70">Username</label>
              <input type="text" className="border p-2 w-full text-black rounded" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
            </div>
            <div>
              <label className="block mb-1 opacity-70">Password</label>
              <input type="text" className="border p-2 w-full text-black rounded" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>
            <div>
              <label className="block mb-1 opacity-70">Email</label>
              <input type="email" className="border p-2 w-full text-black rounded" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={handleGetAll} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition">
            GET /api/users
          </button>
          <button onClick={handleGetById} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded transition">
            GET /api/users/:id
          </button>
          <button onClick={handlePost} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition">
            POST /api/users
          </button>
          <button onClick={handlePut} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 rounded transition">
            PUT /api/users/:id
          </button>
          <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition col-span-2">
            DELETE /api/users/:id
          </button>
        </div>

        <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto min-h-[150px]">
          <h3 className="text-gray-400 mb-2">// Response Console</h3>
          {responseLog ? (
            <pre>{JSON.stringify(responseLog, null, 2)}</pre>
          ) : (
            <span className="opacity-50">Aștept requesturi...</span>
          )}
        </div>
      </div>
    </div>
  );
}