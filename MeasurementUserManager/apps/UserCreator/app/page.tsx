"use client";
import { useState, useEffect } from "react";
import { Users, UserPlus, Database, Terminal, Send, Search, Trash2, Edit3, Activity, Command, Zap } from "lucide-react";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });
  const [log, setLog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const call = async (route: string, options: any = {}) => {
    setIsLoading(true);
    const res = await fetch(route, options);
    const data = res.status !== 204 ? await res.json() : "No Content (204)";
    setLog({ status: res.status, route, data });
    if (res.ok) handleGetAll();
    setIsLoading(false);
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
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0f] text-slate-200 p-4 md:p-8 font-sans selection:bg-indigo-500/30">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/20 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 backdrop-blur-sm pt-2">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-indigo-500/20 to-violet-500/20 p-3 rounded-2xl border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <Command className="text-indigo-400 w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">Pannel Admin</h1>
              <p className="text-indigo-300/60 text-sm font-medium mt-1"></p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-indigo-200/50 bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20 shadow-inner">
            <span className="flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 px-2 text-indigo-400 font-bold mb-1 text-sm uppercase tracking-widest">
              <div className="p-1.5 bg-indigo-500/10 rounded-lg">
                <Database size={16} /> 
              </div>
              
            </div>
            <div className="bg-black/40 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-xl shadow-2xl h-[550px] flex flex-col relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="p-5 border-b border-white/5 bg-white/5 flex items-center justify-between relative z-10">
                <span className="text-xs uppercase text-indigo-200/50 font-bold tracking-widest">Registered Accounts</span>
                <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-3 py-1 rounded-full border border-indigo-500/30 font-bold shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                  {users.length} TOTAL
                </span>
              </div>
              <div className="overflow-y-auto flex-1 p-3 space-y-2 custom-scrollbar relative z-10">
                {users.map(u => (
                  <label key={u.id} className={`group/item relative flex items-center justify-between p-3 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
                    ${selectedUserId === u.id 
                      ? 'bg-indigo-600/20 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'}`}>
                    
                    {selectedUserId === u.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 animate-[fadeIn_0.2s_ease-out]" />
                    )}
                    
                    <input type="radio" name="u" checked={selectedUserId === u.id} onChange={() => onSelectUser(u)} className="sr-only" />
                    
                    <div className="flex items-center gap-3 overflow-hidden ml-1">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 shadow-inner
                        ${selectedUserId === u.id 
                          ? 'bg-indigo-500 text-white scale-110 shadow-[0_0_10px_rgba(99,102,241,0.5)]' 
                          : 'bg-black/50 text-indigo-400/50 group-hover/item:text-indigo-400'}`}>
                        <Users size={14} />
                      </div>
                      <span className={`text-sm font-bold truncate transition-colors
                        ${selectedUserId === u.id ? 'text-white' : 'text-indigo-100 group-hover/item:text-white'}`}>
                        {u.username}
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono truncate ml-2 transition-colors px-2 py-1 rounded-lg
                      ${selectedUserId === u.id ? 'bg-indigo-500/20 text-indigo-200' : 'text-slate-500 bg-black/20 group-hover/item:text-indigo-300'}`}>
                      {u.email}
                    </span>
                  </label>
                ))}
                {users.length === 0 && (
                  <div className="h-full flex items-center justify-center text-indigo-500/30 text-sm font-medium">No accounts found.</div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-black/40 border border-white/10 p-6 md:p-8 rounded-[2rem] space-y-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex items-center gap-2 text-violet-400 font-bold text-sm uppercase tracking-widest relative z-10">
                <div className="p-1.5 bg-violet-500/10 rounded-lg">
                  <Send size={16} /> 
                </div>
                Data Payload Editor
              </div>
              
              <div className="grid md:grid-cols-3 gap-5 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-violet-300/50 tracking-widest px-1">Username</label>
                  <input type="text" placeholder="John Doe" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all placeholder:text-white/20 text-white font-medium hover:border-white/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-violet-300/50 tracking-widest px-1">Email</label>
                  <input type="email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all placeholder:text-white/20 text-white font-medium hover:border-white/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-violet-300/50 tracking-widest px-1">Password</label>
                  <input type="text" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all placeholder:text-white/20 text-white font-medium hover:border-white/20" />
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 relative z-10 pt-4">
                <button onClick={handleGetAll} className="group bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold py-3.5 px-2 rounded-xl border border-white/10 transition-all duration-300 uppercase flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 active:scale-95">
                  <Search size={14} className="text-white/50 group-hover:text-white transition-colors" /> Fetch All
                </button>
                <button onClick={() => call(`/api/users/${selectedUserId}`)} disabled={!selectedUserId} className="group bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold py-3.5 px-2 rounded-xl border border-white/10 transition-all duration-300 uppercase flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:pointer-events-none">
                  <Zap size={14} className="text-white/50 group-hover:text-amber-400 transition-colors" /> Fetch ID
                </button>
                <button onClick={() => call("/api/users", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(formData) })} className="group relative bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold py-3.5 px-2 rounded-xl transition-all duration-300 uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] hover:-translate-y-0.5 active:scale-95 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <UserPlus size={14} className="relative z-10 group-hover:scale-110 transition-transform" /> <span className="relative z-10">Create</span>
                </button>
                <button onClick={() => call(`/api/users/${selectedUserId}`, { method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(formData) })} disabled={!selectedUserId} className="group relative bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-bold py-3.5 px-2 rounded-xl transition-all duration-300 uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(217,119,6,0.3)] hover:shadow-[0_0_25px_rgba(217,119,6,0.5)] hover:-translate-y-0.5 active:scale-95 overflow-hidden disabled:opacity-50 disabled:pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <Edit3 size={14} className="relative z-10 group-hover:scale-110 transition-transform" /> <span className="relative z-10">Update</span>
                </button>
                <button onClick={() => call(`/api/users/${selectedUserId}`, { method: "DELETE" })} disabled={!selectedUserId} className="group relative bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold py-3.5 px-2 rounded-xl transition-all duration-300 uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(225,29,72,0.3)] hover:shadow-[0_0_25px_rgba(225,29,72,0.5)] hover:-translate-y-0.5 active:scale-95 overflow-hidden disabled:opacity-50 disabled:pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <Trash2 size={14} className="relative z-10 group-hover:scale-110 transition-transform" /> <span className="relative z-10">Delete</span>
                </button>
              </div>
            </div>

            <div className="flex-1 bg-[#050508] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl relative">
              <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between font-mono text-[10px] text-white/40 uppercase tracking-widest relative z-10">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-white/60" /> 
                  Network Console
                  {isLoading && <Activity size={12} className="ml-2 animate-spin text-indigo-400" />}
                </div>
                {log && (
                  <span className={`px-2 py-1 rounded-md font-bold shadow-sm ${log.status < 300 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/20 text-rose-400 border border-rose-500/20'}`}>
                    HTTP {log.status}
                  </span>
                )}
              </div>
              <div className="p-5 font-mono text-xs flex-1 overflow-auto custom-scrollbar relative z-10">
                {log ? (
                  <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                    <div className="text-white/40 border-b border-white/5 pb-2 mb-2">
                      <span className="text-indigo-400">Request:</span> {log.route}
                    </div>
                    <pre className="text-emerald-400/90 leading-relaxed whitespace-pre-wrap font-medium">
                      {JSON.stringify(log.data, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-white/20 italic space-y-4">
                    <Terminal size={32} className="opacity-20" />
                    <p>Awaiting network requests...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}