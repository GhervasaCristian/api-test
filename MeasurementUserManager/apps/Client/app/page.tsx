"use client";
import { useState } from "react";
import { LogIn, LogOut, Users, Leaf, ShieldCheck, Mail } from "lucide-react";
import { loginUser, fetchAllUsers } from "./actions";

export default function ClientPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [usersList, setUsersList] = useState<any[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await loginUser(username, password)) {
      setIsLogged(true);
      setUsersList(await fetchAllUsers());
    } else alert("auth failed");
  }

  if (isLogged) {
    return (
      <div className="min-h-screen bg-emerald-950 text-emerald-50 p-4 md:p-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-8">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/30">
                <Leaf className="text-emerald-400 w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-emerald-100">Pannel Portal</h1>
                <p className="text-emerald-500 text-sm">Welcome back, <span className="text-emerald-300 font-bold">{username}</span></p>
              </div>
            </div>
            <button onClick={() => setIsLogged(false)} className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold px-4 py-2.5 rounded-xl border border-red-500/20 transition-all uppercase"><LogOut size={14}/> logout</button>
          </header>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-6">
                <Users size={16} /> Community Directory
              </div>
              <div className="flex flex-col gap-1.5">
                {usersList.map((u) => (
                  <div key={u.id} className="p-2.5 bg-emerald-900/30 border border-emerald-500/10 rounded-xl flex items-center justify-between hover:bg-emerald-500/10 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
                        <Users size={14} />
                      </div>
                      <span className="font-bold text-sm text-emerald-100">{u.username}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-black/20 rounded-lg border border-white/5">
                      <Mail size={10} className="text-emerald-500"/>
                      <span className="text-[10px] text-emerald-400 font-mono tracking-tighter">{u.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 flex items-center justify-center shadow-2xl shadow-emerald-500/10 mb-4 rotate-3">
             <ShieldCheck className="text-emerald-500 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Pannel</h1>
          <p className="text-slate-500 text-sm">Access your environment monitoring dashboard</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-md">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1.5 px-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Username</label>
                <input type="text" className="w-full bg-slate-900 border border-white/10 p-4 rounded-2xl text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-700" placeholder="enter username" value={username} onChange={e => setUsername(e.target.value)} required />
              </div>
              <div className="space-y-1.5 px-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                <input type="password" className="w-full bg-slate-900 border border-white/10 p-4 rounded-2xl text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-700" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-sm flex items-center justify-center gap-2">
              <LogIn size={18} /> Sign In
            </button>
          </form>
        </div>
        
        <p className="text-center text-slate-700 text-xs italic">api v1.0 monitoring system</p>
      </div>
    </div>
  );
}