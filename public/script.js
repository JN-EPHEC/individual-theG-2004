document.addEventListener('DOMContentLoaded', () => {
   fetchUsers();
   if (userForm) {
        userForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            addUser();
        });
    }
});

async function fetchUsers() {
    try {
        const reponse = await fetch('api/users');
        if(!reponse.ok) throw new error('erreur dans la récupération des données');

        const resultat = await reponse.json();
        console.log(resultat);
        listeDB(resultat);
    } catch (error) {
        console.log(error.message);
    }
}

function listeDB(resultat){
    const list = document.getElementById("userList");
    if(!list) return; //si la liste n'existe pas 

    htmlContent = "" //on vide la liste 
    resultat.forEach(function(key){
        htmlContent += `<li class="list-group-item">${key.nom} ${key.prenom}</li>` // on construit la liste 
    });
    list.innerHTML = htmlContent // on l'injecte dynamiquement dans le jS   
}

async function addUser() {
    const INPUT_NOM = document.getElementById("nom");
    const INPUT_PRENOM = document.getElementById("prenom");

    const data = {
        nom: INPUT_NOM.value,
        prenom: INPUT_PRENOM.value
    };

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
        } else {
            alert("Erreur lors de l'ajout de l'utilisateur");
        }
    } catch (error) {
        console.error("Erreur lors du POST :    ", error);
    }
}