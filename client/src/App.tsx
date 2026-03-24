import { useEffect, useState } from "react";

// Interface TypeScript pour typer les données
interface User {
  id: number;
  nom: string;
  prenom: string;
}

function App() {
  // 1. État pour stocker les users
  const [users, setUsers] = useState<User[]>([]);

  // 2. Appel API au chargement du composant
  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erreur fetch :", err));
  }, []);

  // 3. Rendu JSX
  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.prenom} {user.nom}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;