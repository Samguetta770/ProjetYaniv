var express = require('express');
var router = express.Router();

let links = {}; // Stockage temporaire des liens intelligents

// Route POST pour générer un lien intelligent
router.post('/generate-link', (req, res) => {
    const youtubeUrl = req.body.youtubeUrl;



    // Générer un identifiant unique pour le lien
    const linkId = `link-${Date.now()}`;
    links[linkId] = { youtubeUrl };

    res.json({ smartLink: `https://projet-yaniv.vercel.app//${linkId}` }); // Remplacez "your-domain.com" par votre domaine
});

router.get('/:id', (req, res) => {
    const linkId = req.params.id;
    const link = links[linkId];

    if (!link) {
        return res.status(404).send('Lien non trouvé.');
    }

    // Construire l'URL de redirection vers la page intermédiaire
    const redirectPage = `/redirect.html?youtubeUrl=${encodeURIComponent(link.youtubeUrl)}`;
    res.redirect(redirectPage);
});

module.exports = router;
