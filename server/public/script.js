let users = [];

// Affiche une notification temporaire
function showNotif(msg, type = 'success') {
    const el = document.getElementById('notif');
    el.textContent = msg;
    el.className = `notif ${type}`;
    el.style.display = 'block';
    setTimeout(() => el.style.display = 'none', 3000);
}

// Met à jour les KPIs en haut de page
function updateKpis() {
    document.getElementById('kpi-total').textContent = users.length;
    document.getElementById('kpi-last').textContent = users.length ? '#' + users[users.length - 1].id : '—';
    document.getElementById('kpi-status').innerHTML =
        '<span style="color:var(--accent);font-family:Inter,sans-serif;font-size:13px;font-weight:500;">● En ligne</span>';
    document.getElementById('count-badge').textContent =
        users.length + ' enregistrement' + (users.length > 1 ? 's' : '');
}

// Construit et injecte le tableau
function renderList() {
    const tbody = document.getElementById('userList');

    if (!users.length) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">Aucun étudiant enregistré</td></tr>';
        return;
    }

    tbody.innerHTML = users.map(u => `
        <tr>
            <td class="td-id">#${u.id}</td>
            <td>
                <div class="avatar">${u.prenom[0]}${u.nom[0]}</div>
            </td>
            <td>${u.nom}</td>
            <td>${u.prenom}</td>
            <td>
                <button class="btn-del" onclick="deleteUser(${u.id})">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

// Récupère tous les utilisateurs
async function fetchUsers() {
    try {
        const reponse = await fetch('/api/users');

        if (!reponse.ok) throw new Error('Erreur dans la récupération des données');

        users = await reponse.json();

        renderList();
        updateKpis();

    } catch (error) {
        console.error(error.message);
        showNotif('Erreur de connexion au serveur', 'error');
        document.getElementById('kpi-status').innerHTML =
            '<span style="color:var(--danger);font-family:Inter,sans-serif;font-size:13px;">● Hors ligne</span>';
    }
}

// Supprime un utilisateur par ID
async function deleteUser(id) {
    try {
        const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });

        if (response.ok) {
            fetchUsers();
            showNotif('Étudiant supprimé avec succès');
        } else {
            showNotif('Erreur lors de la suppression', 'error');
        }

    } catch (error) {
        console.error('Erreur DELETE :', error);
        showNotif('Erreur réseau', 'error');
    }
}

// Ajoute un utilisateur
async function addUser() {
    const INPUT_NOM = document.getElementById('nom');
    const INPUT_PRENOM = document.getElementById('prenom');
    const btnAdd = document.getElementById('btnAdd');

    const data = {
        nom: INPUT_NOM.value.trim(),
        prenom: INPUT_PRENOM.value.trim()
    };

    if (!data.nom || !data.prenom) return;

    btnAdd.disabled = true;
    btnAdd.textContent = '…';

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            INPUT_NOM.value = '';
            INPUT_PRENOM.value = '';
            fetchUsers();
            showNotif('Étudiant ajouté avec succès ✓');
        } else {
            showNotif("Erreur lors de l'ajout", 'error');
        }

    } catch (error) {
        console.error('Erreur POST :', error);
        showNotif('Erreur réseau', 'error');
    } finally {
        btnAdd.disabled = false;
        btnAdd.textContent = 'Ajouter';
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();

    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', (event) => {
            event.preventDefault();
            addUser();
        });
    }
});