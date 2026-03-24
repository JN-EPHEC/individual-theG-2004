import { useEffect, useState } from "react";

interface User {
  id: number;
  nom: string;
  prenom: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showNotif = (msg: string, type: "success" | "error") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchUsers = () => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => { setUsers(data); setLoading(false); })
      .catch(() => { showNotif("Erreur de connexion au serveur", "error"); setLoading(false); });
  };

  useEffect(() => { fetchUsers(); }, []);

  const addUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !prenom.trim()) return;
    setAdding(true);
    fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, prenom }),
    })
      .then((res) => {
        if (res.ok) {
          setNom(""); setPrenom("");
          fetchUsers();
          showNotif("Étudiant ajouté avec succès ✓", "success");
        } else {
          showNotif("Erreur lors de l'ajout", "error");
        }
      })
      .catch(() => showNotif("Erreur réseau", "error"))
      .finally(() => setAdding(false));
  };

  const deleteUser = (id: number) => {
    setDeletingId(id);
    fetch(`http://localhost:3000/api/users/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) { fetchUsers(); showNotif("Étudiant supprimé", "success"); }
        else showNotif("Erreur lors de la suppression", "error");
      })
      .catch(() => showNotif("Erreur réseau", "error"))
      .finally(() => setDeletingId(null));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0a0f;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        .app {
          min-height: 100vh;
          background: #0a0a0f;
          color: #e8e4dc;
          position: relative;
          overflow-x: hidden;
        }

        .bg-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,200,100,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,200,100,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        .bg-glow {
          position: fixed;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(212,165,89,0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .wrapper {
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin: 0 auto;
          padding: 60px 32px;
        }

        /* HEADER */
        .header {
          margin-bottom: 64px;
          animation: fadeDown 0.6s ease both;
        }

        .header-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #d4a559;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .header-eyebrow::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: #d4a559;
        }

        .header h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          font-weight: 900;
          line-height: 1.05;
          color: #f0ebe0;
          letter-spacing: -0.02em;
        }

        .header h1 span {
          color: #d4a559;
        }

        .header-sub {
          margin-top: 16px;
          font-size: 15px;
          color: #7a7060;
          font-weight: 300;
          letter-spacing: 0.01em;
        }

        /* NOTIFICATION */
        .notif {
          position: fixed;
          top: 24px;
          right: 24px;
          padding: 14px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          z-index: 100;
          animation: slideIn 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .notif.success {
          background: rgba(34,197,94,0.15);
          border: 1px solid rgba(34,197,94,0.3);
          color: #86efac;
        }

        .notif.error {
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.3);
          color: #fca5a5;
        }

        /* FORM CARD */
        .form-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 36px;
          margin-bottom: 48px;
          animation: fadeUp 0.6s 0.1s ease both;
          position: relative;
          overflow: hidden;
        }

        .form-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,165,89,0.4), transparent);
        }

        .form-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7a7060;
          margin-bottom: 20px;
          display: block;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 12px;
          align-items: end;
        }

        .input-wrap { display: flex; flex-direction: column; gap: 8px; }

        .input-wrap label {
          font-size: 11px;
          font-weight: 500;
          color: #5a5248;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .input-wrap input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 12px 16px;
          color: #e8e4dc;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          width: 100%;
        }

        .input-wrap input::placeholder { color: #3d3830; }

        .input-wrap input:focus {
          border-color: rgba(212,165,89,0.5);
          background: rgba(212,165,89,0.04);
        }

        .btn-add {
          background: #d4a559;
          color: #0a0a0f;
          border: none;
          border-radius: 8px;
          padding: 12px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          white-space: nowrap;
          height: 46px;
        }

        .btn-add:hover { background: #e0b46a; }
        .btn-add:active { transform: scale(0.98); }
        .btn-add:disabled { opacity: 0.5; cursor: not-allowed; }

        /* STATS */
        .stats-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          animation: fadeUp 0.6s 0.2s ease both;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #f0ebe0;
        }

        .count-badge {
          font-size: 12px;
          font-weight: 500;
          color: #d4a559;
          background: rgba(212,165,89,0.1);
          border: 1px solid rgba(212,165,89,0.2);
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: 0.05em;
        }

        /* LIST */
        .user-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
          animation: fadeUp 0.6s 0.3s ease both;
        }

        .user-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 24px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 10px;
          transition: background 0.2s, border-color 0.2s;
          animation: fadeUp 0.4s ease both;
        }

        .user-item:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.09);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(212,165,89,0.2), rgba(212,165,89,0.05));
          border: 1px solid rgba(212,165,89,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 500;
          color: #d4a559;
          flex-shrink: 0;
        }

        .user-name {
          font-size: 15px;
          font-weight: 400;
          color: #e8e4dc;
        }

        .user-name strong {
          font-weight: 500;
        }

        .user-id {
          font-size: 11px;
          color: #3d3830;
          font-weight: 300;
          margin-top: 2px;
        }

        .btn-delete {
          background: none;
          border: 1px solid transparent;
          color: #3d3830;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 13px;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }

        .btn-delete:hover {
          color: #ef4444;
          border-color: rgba(239,68,68,0.3);
          background: rgba(239,68,68,0.05);
        }

        /* LOADING */
        .loading {
          text-align: center;
          padding: 60px;
          color: #3d3830;
          font-size: 14px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .loading-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #d4a559;
          margin: 0 3px;
          animation: pulse 1.2s ease infinite;
        }

        .loading-dot:nth-child(2) { animation-delay: 0.2s; }
        .loading-dot:nth-child(3) { animation-delay: 0.4s; }

        .empty {
          text-align: center;
          padding: 60px;
          color: #3d3830;
          font-size: 14px;
        }

        /* ANIMATIONS */
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr; }
          .wrapper { padding: 40px 20px; }
        }
      `}</style>

      <div className="app">
        <div className="bg-grid" />
        <div className="bg-glow" />

        {notification && (
          <div className={`notif ${notification.type}`}>
            {notification.msg}
          </div>
        )}

        <div className="wrapper">

          {/* HEADER */}
          <header className="header">
            <div className="header-eyebrow">Système de gestion</div>
            <h1>Registre des<br /><span>Étudiants</span></h1>
            <p className="header-sub">Gestion centralisée des inscriptions</p>
          </header>

          {/* FORM */}
          <div className="form-card">
            <span className="form-label">Nouvel étudiant</span>
            <form onSubmit={addUser}>
              <div className="form-row">
                <div className="input-wrap">
                  <label>Nom</label>
                  <input
                    type="text"
                    placeholder="Dupont"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                  />
                </div>
                <div className="input-wrap">
                  <label>Prénom</label>
                  <input
                    type="text"
                    placeholder="Jean"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn-add" disabled={adding}>
                  {adding ? "..." : "Ajouter"}
                </button>
              </div>
            </form>
          </div>

          {/* LIST */}
          <div className="stats-bar">
            <h2 className="section-title">Liste des inscrits</h2>
            <span className="count-badge">{users.length} étudiant{users.length !== 1 ? "s" : ""}</span>
          </div>

          {loading ? (
            <div className="loading">
              <span className="loading-dot" />
              <span className="loading-dot" />
              <span className="loading-dot" />
            </div>
          ) : users.length === 0 ? (
            <div className="empty">Aucun étudiant enregistré</div>
          ) : (
            <div className="user-list">
              {users.map((user, i) => (
                <div
                  key={user.id}
                  className="user-item"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="user-info">
                    <div className="user-avatar">
                      {user.prenom[0]}{user.nom[0]}
                    </div>
                    <div>
                      <div className="user-name">
                        <strong>{user.prenom}</strong> {user.nom}
                      </div>
                      <div className="user-id">ID #{user.id}</div>
                    </div>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => deleteUser(user.id)}
                    disabled={deletingId === user.id}
                  >
                    {deletingId === user.id ? "..." : "Supprimer"}
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default App;