const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Route de test
app.get('/', (req, res) => {
    res.send('Le serveur fonctionne !');
});

// Route register
app.get('/register', (req, res) => {
    const { username } = req.body;
    console.log(`Reçu: ${username}`);
    //Ici faire les requête BDD
    // Requête 1 : Vérifier si l'utilisateur existe'
    // Si user exist, renvoyer false
    // Sinon, Requête 2 : insérer user et return true
    res.json({ message: "True or False" });
});
// Route pour le login
app.get('/login', (req, res) => {
    const { username } = req.body;
    console.log(`Login attempt with username: ${username}`);
    //Ici faire la requête à la base de donnée des users. Si trouvé return TRUE sinon FALSE
    res.json({ message: "TRUE OR FALSE" });
});

// Route enregistrement de la roue
app.post('/wheelregister', (req, res) => {
    const { username, id1, id2, id3, id4, id5, id6, id7, id8 } = req.body;
    console.log(`Reçu: ${req.body}`);
    //Ici faire les requête BDD
    // Requête 1 : Vérifier si la roue existe
    // Requête 2 : Si la roue existe, implémenter nombre d'utilisation de +1
    // Sinon, insérer la roue et mettre nb utilisation à 1
    // Requête 3 : Vérifier si user a deja utilisé une roue
    // Requête 4 : Si deja utilisé, mettre nouvel ID roue, sinon insérer l'utilisateur et l'ID roue.
    res.json({ message: "Roue sauvegardée" });
});

// Route dernière roue utilisée
app.get('/lastwheel', (req, res) => {
    const { username, id1, id2, id3, id4, id5, id6, id7, id8 } = req.body;
    console.log(`Reçu: ${req.body}`);
    //Ici faire les requête BDD
    // Requête 1 : Vérifier si l'utilisateur existe'
    // Requête 2 : Si user exist, renvoyer le param de la roue (récup ID roue et lecture de la base roue)
    // Sinon, return une roue vide.
    res.json({ message: `dernière roue ${wheelID}` });
});
//Potentiel : Route retournant la liste de toutes les routes de l'utilisateur
// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});

