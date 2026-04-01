# tUserManager - Monorepo (Next.js 15 + Turborepo + pnpm)

Acesta este un proiect de tip **Monorepo** dezvoltat pentru un assignment universitar, utilizând cele mai noi tehnologii web (Next.js 15, Turborepo și pnpm). 

Proiectul simulează un sistem de gestionare a utilizatorilor.

---

## Ghid de Instalare și Setup (pnpm)

Pentru a rula acest proiect, urmează pașii de mai jos într-un terminal deschis în root directory (`/MeasurementUserManager`):

### 1.Instalare pnpm (Dacă nu este instalat)
Dacă nu ai `pnpm` instalat pe sistem, poți folosi npm pentru a-l instala global:
```powershell
npm install -g pnpm
```

### 2.Instalare Dependențe
Instalează toate librăriile necesare pentru întregul monorepo dintr-o singură comandă:
```powershell
pnpm install
```

### 3.Pornirea Aplicațiilor
Pornește ambele servere de dezvoltare (Admin și Client) simultan folosind pnpm:
```powershell
pnpm dev
```
*   **UserCreator (Admin):** [http://localhost:3000](http://localhost:3000)
*   **Client App:** [http://localhost:3001](http://localhost:3001)

---

## Arhitectura Proiectului (Monorepo)

Proiectul este organizat ca un **Monorepo** pentru a permite partajarea de cod între frontend-ul de administrare și cel de client, menținând totodată aplicațiile separate.

### Structura Folderelor:
*   `apps/UserCreator/`: Panoul de control administrativ. Deține API-ul central și baza de date in-memory.
*   `apps/Client/`: Aplicația de vizualizare pentru utilizatorii finali. Comunică cu `UserCreator` prin API.
*   `packages/shared/`: Un pachet partajat ce conține tipuri TypeScript și logica de bază (db logic).
*   `turbo.json`: Configurația pentru Turborepo care optimizează procesele de build și dev.

---

## Prezentarea Aplicațiilor

### 1.UserCreator (Admin Panel) - Port 3000
Această aplicație servește ca **Backend & Admin Interface**. 
*   **REST API Explorer:** Interfața este construită pentru a testa vizual verbele HTTP: `GET`, `POST`, `PUT`, `DELETE`.
*   **Baza de date In-Memory:** Datele sunt stocate temporar într-un array pe serverul Admin-ului.
*   **Selecție Radio:** Permite selectarea unui utilizator precis prin Radio Button pentru a-i modifica datele (via `PUT` pe ID) sau pentru a-l șterge (via `DELETE`).
*   **Live Console:** Afișează în timp real "Payload-urile" și status-code-urile răspunsurilor de la API (ex: 201 Created, 204 No Content).

### 2.Client App - Port 3001
O interfață simpla.
*   **Sincronizare API:** Nu deține o bază de date proprie. Consumă datele direct prin request-uri HTTP către portul 3000.
*   **Login Flow:** Permite autentificarea bazată pe utilizatorii creați în Admin.
*   **Vizualizare Date:** După logare, afișează lista completă a tuturor celor înregistrați prin Server Actions.

---

## 🧩 Comenzi Utile (pnpm + Turbo)

| Comandă | Descriere |
| :--- | :--- |
| `pnpm install` | Instalează dependențele în tot monorepo-ul. |
| `pnpm build` | Generează pachetele de producție (optimizate) pentru ambele apps. |
| `pnpm dev` | Pornește ambele aplicații în modul de dezvoltare. |
| `pnpm lint` | Rulează verificările de sintaxă pe tot codul sursă. |

---
