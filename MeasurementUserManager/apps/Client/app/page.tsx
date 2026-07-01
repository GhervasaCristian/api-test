"use client";
import { useState } from "react";
import { LogIn, LogOut, Users, Leaf, ShieldCheck, Mail, ChevronRight, Activity, ArrowRight } from "lucide-react";
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
      <div className="min-h-screen bg-[#0E0E11] text-zinc-100 p-4 md:p-8 font-sans selection:bg-emerald-500/30 font-medium">
        <div className="max-w-[1200px] mx-auto space-y-6">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 mt-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-500 text-black rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)] rotate-3">
                <Leaf size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Dashboard</h1>
                <p className="text-zinc-400 text-sm">Welcome back, <span className="text-emerald-400 font-semibold">{username}</span></p>
              </div>
            </div>
            <button 
              onClick={() => setIsLogged(false)} 
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-zinc-300 text-sm font-semibold px-6 py-3 rounded-full border border-white/5 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Sign Out
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Stats Bento Box */}
            <div className="col-span-1 bg-zinc-900/50 border border-zinc-800/80 rounded-[32px] p-8 flex flex-col justify-between hover:border-emerald-500/30 transition-colors duration-500 group relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />
              
              <div>
                <div className="flex items-center gap-3 text-zinc-400 text-sm font-semibold uppercase tracking-widest mb-6">
                  <Activity size={18} className="text-emerald-500" /> System Status
                </div>
                <h2 className="text-6xl font-black text-white tracking-tighter">{usersList.length}</h2>
                <p className="text-zinc-500 text-sm font-medium mt-2">Active monitored users</p>
              </div>
              
              <div className="mt-12 p-4 bg-black/40 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                <span className="text-sm text-zinc-300 font-semibold tracking-wide"></span>
              </div>
            </div>

            {/* List Bento Box */}
            <div className="col-span-1 lg:col-span-2 bg-zinc-900/50 border border-zinc-800/80 rounded-[32px] p-8 hover:border-zinc-700 transition-colors duration-500 backdrop-blur-xl flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 text-white text-lg font-bold tracking-tight">
                  <Users size={24} className="text-zinc-400" /> Community Directory
                </div>
                <div className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full">
                  
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1 overflow-auto custom-scrollbar">
                {usersList.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-zinc-600 font-medium pb-8">No active users</div>
                ) : (
                  usersList.map((u, i) => (
                    <div key={u.id} className="group/item relative p-4 bg-zinc-950/50 hover:bg-zinc-800/50 border border-zinc-800/50 hover:border-zinc-700 rounded-2xl flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-xl hover:-translate-y-1">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 font-bold group-hover/item:text-emerald-400 group-hover/item:border-emerald-500/30 transition-colors">
                          {u.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base leading-tight">{u.username}</h3>
                          <p className="text-zinc-500 text-xs font-mono mt-1 flex items-center gap-1.5"><Mail size={10} /> {u.email}</p>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover/item:bg-white group-hover/item:text-black transition-all">
                        <ArrowRight size={18} className="-rotate-45 group-hover/item:rotate-0 transition-transform duration-500" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>

        <style jsx global>{`
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4 selection:bg-emerald-500/30 relative overflow-hidden font-sans">
      
      {/* Absolute blurry orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="w-full max-w-[420px] relative z-10 space-y-8">
        
        <div className="text-center space-y-3">
          <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-emerald-400 to-teal-600 rounded-[28px] flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)] mb-8 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
             <ShieldCheck className="text-white w-10 h-10" />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Welcome Back</h1>
          <p className="text-zinc-400 text-sm font-medium">Log in to enter the monitoring portal.</p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-[32px] shadow-2xl backdrop-blur-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest pl-1">Username</label>
                <input 
                  type="text" 
                  className="w-full bg-zinc-950/50 border border-zinc-800 p-4 rounded-2xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all placeholder:text-zinc-700 hover:border-zinc-700" 
                  placeholder="admin" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest pl-1">Password</label>
                <input 
                  type="password" 
                  className="w-full bg-zinc-950/50 border border-zinc-800 p-4 rounded-2xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all placeholder:text-zinc-700 hover:border-zinc-700" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="group w-full bg-white text-black font-bold py-4 rounded-2xl transition-all duration-300 hover:bg-zinc-200 active:scale-95 flex items-center justify-center gap-2 mt-4"
            >
              <span>Continue</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /> 
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}