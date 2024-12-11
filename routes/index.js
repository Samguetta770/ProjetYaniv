var express = require('express');
var router = express.Router();

let links = {}; // Stockage temporaire des liens intelligents

// Route POST pour générer un lien intelligent
router.post('/generate-link', (req, res) => {
    const youtubeUrl = req.body.youtubeUrl;



    // Générer un identifiant unique pour le lien
    const linkId = `link-${Date.now()}`;
    links[linkId] = { youtubeUrl };

    res.json({ smartLink: `https://your-domain.com/${linkId}` }); // Remplacez "your-domain.com" par votre domaine
});

// Route GET pour gérer la redirection avec délai
router.get('/:id', (req, res) => {
    const linkId = req.params.id;
    const link = links[linkId];

    if (!link) {
        return res.status(404).send('Lien non trouvé.');
    }

    // Rendre une page vide immédiatement avec un message d'attente
    res.send(`
        <html>
            <head>
                <title>Redirection...</title>
                <meta charset="UTF-8">
                <style>
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        font-family: Arial, sans-serif;
                        background-color: #f9f9f9;
                    }
                    h1 {
                        color: #333;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <h1>Veuillez patienter, redirection en cours...</h1>
            </body>
        </html>
    `);

    // Logique de redirection avec un délai
    const DELAY_MS = 3000; // 3 secondes de délai
    setTimeout(() => {
        const userAgent = req.headers['user-agent'].toLowerCase();

        if (/instagram/.test(userAgent)) {
            // Si le lien est ouvert dans Instagram, redirige vers le site YouTube
            res.redirect(link.youtubeUrl);
        } else if (/android/.test(userAgent)) {
            // Redirige vers l'application YouTube sur Android
            res.redirect(`youtube://`);
        } else if (/iphone|ipad/.test(userAgent)) {
            // Redirige vers l'application YouTube sur iOS
            res.redirect(`youtube://`);
        } else {
            // Redirige vers le site web YouTube en fallback
            res.redirect(link.youtubeUrl);
        }
    }, DELAY_MS);
});

module.exports = router;
