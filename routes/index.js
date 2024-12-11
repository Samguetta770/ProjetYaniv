const express = require('express');
const router = express.Router();

let links = {}; // Stockage temporaire des liens intelligents

// Générer un lien intermédiaire
router.post('/generate-link', (req, res) => {
    const { destinationUrl } = req.body;

    if (!destinationUrl || !destinationUrl.startsWith('http')) {
        return res.status(400).json({ error: 'URL invalide.' });
    }

    const uniqueId = `link-${Date.now()}`; // Crée un identifiant unique
    links[uniqueId] = destinationUrl; // Stocke l'URL cible avec cet ID

    res.json({ smartLink: `https://projet-yaniv.vercel.app/${uniqueId}` });
});

// Redirection intermédiaire
router.get('/:id', (req, res) => {
    const linkId = req.params.id;
    const destinationUrl = links[linkId];

    if (!destinationUrl) {
        return res.status(404).send('Lien non trouvé.');
    }

    // Page intermédiaire avec délai avant redirection
    res.send(`
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Redirection...</title>
            <script>
                setTimeout(() => {
                    window.location.href = "${destinationUrl}";
                }, 3000); // Délai de 3 secondes
            </script>
        </head>
        <body>
            <p>Redirection en cours... Si cela prend trop de temps, <a href="${destinationUrl}">cliquez ici</a>.</p>
        </body>
        </html>
    `);
});

module.exports = router;
