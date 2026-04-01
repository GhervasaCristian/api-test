"use client";
import { useState, useEffect } from "react";
import { Users, UserPlus, Database, Terminal, Send, Search, Trash2, Edit3, Activity } from "lucide-react";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });
  const [log, setLog] = useState<any>(null);
  
  const call = async (route: string, options: any = {}) => {
    const res = await fetch(route, options);
    const data = res.status !== 204 ? await res.json() : "No Content (204)";
    setLog({ status: res.status, route, data });
    if (res.ok) handleGetAll();
    return res;
  };

  const handleGetAll = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => { handleGetAll(); }, []);

  const onSelectUser = (u: any) => {
    setSelectedUserId(u.id);
    setFormData({ username: u.username, email: u.email, password: u.password || "" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex items-center justify-between border-b border-white/5 pb-8">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500/20 p-2 rounded-xl border border-indigo-500/30">
              <Activity className="text-indigo-400 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Pannel Admin</h1>
              <p className="text-slate-500 text-sm">centralized user management system</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> system live</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 px-2 text-indigo-400 font-semibold mb-2 text-sm uppercase tracking-widest">
              <Database size={14} /> Database View
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl h-[500px] flex flex-col">
              <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <span className="text-xs uppercase text-slate-500 font-bold">accounts</span>
                <span className="bg-indigo-500/20 text-indigo-400 text-[10px] px-2 py-0.5 rounded-full border border-indigo-500/20">{users.length} total</span>
              </div>
              <div className="overflow-y-auto flex-1 p-1 space-y-0.5 custom-scrollbar">
                {users.map(u => (
                  <label key={u.id} className={`group relative flex items-center justify-between px-2 py-1.5 rounded-md border transition-all cursor-pointer ${selectedUserId === u.id ? 'bg-indigo-600 border-indigo-400 shadow-sm' : 'bg-transparent border-transparent hover:bg-white/5'}`}>
                    <input type="radio" name="u" checked={selectedUserId === u.id} onChange={() => onSelectUser(u)} className="sr-only" />
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${selectedUserId === u.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-600'}`}>
                        <Users size={10} />
                      </div>
                      <span className={`text-xs font-bold truncate ${selectedUserId === u.id ? 'text-white' : 'text-indigo-100'}`}>{u.username}</span>
                    </div>
                    <span className={`text-[9px] font-mono opacity-50 truncate ml-2 transition-colors ${selectedUserId === u.id ? 'text-white underline' : 'text-slate-500'}`}>{u.email}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-indigo-500/5 border border-indigo-500/10 p-6 rounded-2xl space-y-6">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm uppercase tracking-widest">
                <Send size={14} /> Payload
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <input type="text" placeholder="username" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="bg-slate-900 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600" />
                <input type="email" placeholder="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-slate-900 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600" />
                <input type="text" placeholder="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="bg-slate-900 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                <button onClick={handleGetAll} className="bg-slate-100/5 hover:bg-white/10 text-[10px] font-bold p-3 rounded-xl border border-white/10 transition-colors uppercase flex items-center justify-center gap-2"><Search size={12}/> get all</button>
                <button onClick={() => call(`/api/users/${selectedUserId}`)} className="bg-slate-100/5 hover:bg-white/10 text-[10px] font-bold p-3 rounded-xl border border-white/10 transition-colors uppercase flex items-center justify-center gap-2">get id</button>
                <button onClick={() => call("/api/users", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(formData) })} className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold p-3 rounded-xl transition-all uppercase flex items-center justify-center gap-2"><UserPlus size={12}/> post</button>
                <button onClick={() => call(`/api/users/${selectedUserId}`, { method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(formData) })} className="bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-bold p-3 rounded-xl transition-all uppercase flex items-center justify-center gap-2"><Edit3 size={12}/> put</button>
                <button onClick={() => call(`/api/users/${selectedUserId}`, { method: "DELETE" })} className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold p-3 rounded-xl transition-all uppercase flex items-center justify-center gap-2"><Trash2 size={12}/> delete</button>
              </div>
            </div>

            <div className="flex-1 bg-slate-900 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
              <div className="p-3 border-b border-white/10 bg-black/20 flex items-center justify-between font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                <div className="flex items-center gap-2"><Terminal size={12} /> console</div>
                {log && <span className={log.status < 300 ? 'text-green-400' : 'text-red-400'}>HTTP {log.status}</span>}
              </div>
              <div className="p-4 font-mono text-xs flex-1 overflow-auto bg-black/40">
                {log ? (
                  <pre className="text-green-400 leading-relaxed whitespace-pre-wrap">
                    {JSON.stringify(log.data, null, 2)}
                  </pre>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-700 italic">waiting...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}