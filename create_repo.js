const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'MeasurementUserManager');

const files = {
  'package.json': JSON.stringify({
    "name": "measurement-user-manager",
    "private": true,
    "scripts": {
      "build": "turbo run build",
      "dev": "turbo run dev",
      "lint": "turbo run lint"
    },
    "devDependencies": {
      "turbo": "^2.0.0",
      "typescript": "^5.0.0"
    },
    "workspaces": [
      "apps/*",
      "packages/*"
    ]
  }, null, 2),
  'turbo.json': JSON.stringify({
    "$schema": "https://turbo.build/schema.json",
    "tasks": {
      "build": {
        "dependsOn": ["^build"],
        "outputs": [".next/**", "!.next/cache/**"]
      },
      "dev": {
        "cache": false,
        "persistent": true
      },
      "lint": {}
    }
  }, null, 2),
  'apps/UserCreator/package.json': JSON.stringify({
    "name": "user-creator",
    "version": "1.0.0",
    "scripts": {
      "dev": "next dev -p 3000",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    },
    "dependencies": {
      "next": "^15.0.0",
      "react": "^19.0.0",
      "react-dom": "^19.0.0",
      "shared": "workspace:*",
      "lucide-react": "^0.300.0"
    },
    "devDependencies": {
      "@types/node": "^20.0.0",
      "@types/react": "^19.0.0",
      "@types/react-dom": "^19.0.0",
      "autoprefixer": "^10.0.0",
      "postcss": "^8.0.0",
      "tailwindcss": "^3.4.0",
      "typescript": "^5.0.0"
    }
  }, null, 2),
  'apps/UserCreator/tsconfig.json': JSON.stringify({
    "compilerOptions": {
      "target": "ES2017",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "plugins": [
        {
          "name": "next"
        }
      ],
      "paths": {
        "@/*": ["./*"]
      }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
  }, null, 2),
  'apps/UserCreator/next.config.mjs': `/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['shared'],
};
export default nextConfig;`,
  'apps/UserCreator/tailwind.config.ts': `import type { Config } from "tailwindcss";
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;`,
  'apps/UserCreator/postcss.config.mjs': `/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,
  'apps/UserCreator/app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}`,
  'apps/UserCreator/app/layout.tsx': `export const metadata = {
  title: 'Admin - Măsurători de Mediu',
  description: 'Panou administrator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  )
}`,
  'apps/UserCreator/app/api/users/route.ts': `import { NextRequest, NextResponse } from "next/server";
import { getAllUsers, createUser, getUserByUsername } from "shared/db";

// Comentariu pentru facultate: Returnăm toți utilizatorii
export async function GET() {
  return NextResponse.json(getAllUsers(), { status: 200 });
}

// Comentariu pentru facultate: Creăm un utilizator nou
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, email } = body;
    
    // Verificăm dacă există deja
    const exists = getUserByUsername(username);
    if (exists) {
      return NextResponse.json({ message: "Utilizatorul există deja!" }, { status: 400 });
    }

    const newUser = createUser(username, password, email);
    return NextResponse.json({ message: "Creat cu succes", user: newUser }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Eroare la creare" }, { status: 500 });
  }
}`,
  'apps/UserCreator/app/api/users/[id]/route.ts': `import { NextRequest, NextResponse } from "next/server";
import { getUserById, updateUser, deleteUser } from "shared/db";

// Pentru GET by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getUserById(params.id);
  if (!user) return NextResponse.json({ message: "Nu a fost găsit" }, { status: 404 });
  return NextResponse.json(user, { status: 200 });
}

// Pentru PUT (Update)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updated = updateUser(params.id, body);
    if (!updated) return NextResponse.json({ message: "Utilizator inexistent" }, { status: 404 });
    
    return NextResponse.json({ message: "Actualizat cu succes", user: updated }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Eroare la actualizare" }, { status: 500 });
  }
}

// Pentru DELETE
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const success = deleteUser(params.id);
  if (!success) return NextResponse.json({ message: "Nu a fost găsit" }, { status: 404 });
  return new NextResponse(null, { status: 204 });
}`,
  'apps/UserCreator/app/api/users/check/route.ts': `import { NextRequest, NextResponse } from "next/server";
import { getUserByUsername } from "shared/db";

// Verifica existenta unui user (GET prin search params: ?username=...)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  
  if (!username) return NextResponse.json({ message: "Lipsă username" }, { status: 400 });
  
  const user = getUserByUsername(username);
  if (user) {
    return NextResponse.json({ message: \`Utilizatorul \${username} există!\`, exists: true }, { status: 200 });
  } else {
    return NextResponse.json({ message: \`Utilizatorul \${username} este disponibil.\`, exists: false }, { status: 200 });
  }
}`,
  'apps/UserCreator/app/page.tsx': `"use client";
import { useState, useEffect } from "react";

// Comentariu pentru facultate: Aceasta este pagina principala de admin
export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });
  const [checkMsg, setCheckMsg] = useState("");
  
  // Încarcă userii la început
  const loadUsers = async () => {
    const res = await fetch("/api/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    
    if (res.ok) {
      alert("Utilizator creat cu succes!");
      setFormData({ username: "", password: "", email: "" });
      loadUsers();
    } else {
      const data = await res.json();
      alert("Eroare: " + data.message);
    }
  };

  const handleCheck = async () => {
    if (!formData.username) return alert("Introdu un username");
    const res = await fetch(\`/api/users/check?username=\${formData.username}\`);
    const data = await res.json();
    setCheckMsg(data.message);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur ștergi?")) return;
    const res = await fetch(\`/api/users/\${id}\`, { method: "DELETE" });
    if (res.ok) loadUsers();
    else alert("Eroare la ștergere");
  };

  const handleUpdate = async (id: string) => {
    const newEmail = prompt("Introdu un nou email:");
    if (!newEmail) return;
    const res = await fetch(\`/api/users/\${id}\`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newEmail })
    });
    if (res.ok) loadUsers();
    else alert("Eroare la modificare");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Admin: Măsurători de mediu</h1>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Adaugă Utilizator</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm">Username</label>
            <input type="text" className="border p-2 w-full text-black rounded" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input type="text" className="border p-2 w-full text-black rounded" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input type="email" className="border p-2 w-full text-black rounded" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>
          
          <div className="flex gap-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Creează</button>
            <button type="button" onClick={handleCheck} className="bg-gray-500 text-white px-4 py-2 rounded">Check if exists</button>
          </div>
          {checkMsg && <p className="text-sm text-blue-500">{checkMsg}</p>}
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Lista Utilizatori</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-900 shadow rounded-lg">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-3">{u.id}</td>
                  <td className="p-3">{u.username}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleUpdate(u.id)} className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">Edit</button>
                    <button onClick={() => handleDelete(u.id)} className="bg-red-500 text-white px-2 py-1 rounded text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}`,

  'apps/Client/package.json': JSON.stringify({
    "name": "client",
    "version": "1.0.0",
    "scripts": {
      "dev": "next dev -p 3001",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    },
    "dependencies": {
      "next": "^15.0.0",
      "react": "^19.0.0",
      "react-dom": "^19.0.0",
      "shared": "workspace:*",
      "lucide-react": "^0.300.0"
    },
    "devDependencies": {
      "@types/node": "^20.0.0",
      "@types/react": "^19.0.0",
      "@types/react-dom": "^19.0.0",
      "autoprefixer": "^10.0.0",
      "postcss": "^8.0.0",
      "tailwindcss": "^3.4.0",
      "typescript": "^5.0.0"
    }
  }, null, 2),
  'apps/Client/tsconfig.json': JSON.stringify({
    "compilerOptions": {
      "target": "ES2017",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "plugins": [
        {
          "name": "next"
        }
      ],
      "paths": {
        "@/*": ["./*"]
      }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
  }, null, 2),
  'apps/Client/next.config.mjs': `/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['shared'],
};
export default nextConfig;`,
  'apps/Client/tailwind.config.ts': `import type { Config } from "tailwindcss";
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;`,
  'apps/Client/postcss.config.mjs': `/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,
  'apps/Client/app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #f0fdf4; /* verde deschis specific pentru mediu */
  --foreground: #14532d;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #022c22;
    --foreground: #ecfdf5;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}`,
  'apps/Client/app/layout.tsx': `export const metadata = {
  title: 'Client - Măsurători de Mediu',
  description: 'Aplicația client',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  )
}`,
  'apps/Client/app/page.tsx': `"use client";
import { useState } from "react";
// Comentariu pentru facultate: Clientul face request spre baza in-memory prin server action / API sau direct in fisierul comun
import { getUserByUsername, getAllUsers } from "shared/db";

// Pentru simplitate extremă (deoarece suntem într-un monorepo și putem importa "shared/db" direct în server actions),
// vom folosi un Server Action simulativ
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
}`,
  'apps/Client/app/actions.ts': `"use server";
import { getUserByUsername, getAllUsers } from "shared/db";

// Comentariu pentru facultate: Server action pentru a verifica simplu logarea pe partea de server
export async function loginUser(user: string, pass: string) {
  const account = getUserByUsername(user);
  if (account && account.password === pass) {
    return true;
  }
  return false;
}

export async function fetchAllUsers() {
  return getAllUsers();
}`,
  'packages/shared/package.json': JSON.stringify({
    "name": "shared",
    "version": "1.0.0",
    "main": "db.ts",
    "types": "db.ts"
  }, null, 2),
  'packages/shared/tsconfig.json': JSON.stringify({
    "compilerOptions": {
      "target": "ES2017",
      "module": "CommonJS",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true
    }
  }, null, 2)
};

Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(rootDir, filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content);
  console.log('Created: ' + fullPath);
});
