// db mock
export type User = {
  id: string;
  username: string;
  password?: string;
  email: string;
  createdAt: string;
};

let users: User[] = [];

// crud ops
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

export function getUserByUsername(username: string) {
  // return pass for local login check
  return users.find(u => u.username === username) || null;
}

export function createUser(username: string, password: string, email: string) {
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
}