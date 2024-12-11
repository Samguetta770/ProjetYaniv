var express = require('express');
var router = express.Router();

let links = {}; // Stockage temporaire des liens intelligents

/* GET home page */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

// Route POST pour générer un lien intelligent
router.post('/generate-link', (req, res) => {
    const youtubeUrl = req.body.youtubeUrl;

    if (!youtubeUrl || !youtubeUrl.includes('youtube.com')) {
        return res.status(400).json({ error: 'URL YouTube invalide.' });
    }

    // Générer un identifiant unique pour le lien
    const linkId = `link-${Date.now()}`;
    links[linkId] = { youtubeUrl };

    // Retourner le lien généré
    res.json({ smartLink: `https://projet-yaniv.vercel.app/${linkId}` });
});

// Route GET pour rediriger en fonction de l'ID
router.get('/:id', (req, res) => {
    const linkId = req.params.id;
    const link = links[linkId];

    if (!link) {
        return res.status(404).send('Lien non trouvé.');
    }

    const userAgent = req.headers['user-agent'].toLowerCase();

    // Détection du type d'appareil
    if (/android/.test(userAgent)) {
        res.redirect(`youtube://`);
    } else if (/iphone|ipad/.test(userAgent)) {
        res.redirect(`youtube://`);
    } else {
        res.redirect(link.youtubeUrl); // Redirige vers le site web
    }
});

module.exports = router; // Doit être à la fin après la déclaration des routes
