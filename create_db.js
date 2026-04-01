const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'MeasurementUserManager');

const files = {
  'packages/shared/db.ts': `// in-memory database
export type User = {
  id: string;
  username: string;
  password?: string;
  email: string;
  createdAt: string;
};

// Array of users
let users: User[] = [];

// CRUD fcn

export function getAllUsers() {
  return users.map(u => {
    const { password, ...rest } = u;
    return rest;
  });
}

export function getUserById(id: string) {
  const user = users.find(u => u.id === id);
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
}
//return functions
export function getUserByUsername(username: string) {
  return users.find(u => u.username === username) || null;
}

export function createUser(username: string, password: string, email: string) {
  // Generam un ID simplu
  const id = Math.random().toString(36).substring(2, 9);
  const newUser: User = {
    id,
    username,
    password,
    email,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  const { password: _, ...rest } = newUser;
  return rest;
}

export function updateUser(id: string, updates: Partial<User>) {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  
  users[index] = { ...users[index], ...updates };
  const { password, ...rest } = users[index];
  return rest;
}

export function deleteUser(id: string) {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return false;
  
  users.splice(index, 1);
  return true;
}`
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
