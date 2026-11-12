const express = require('express');
const router = express.Router();
const { Artisan, Specialite, Categorie} = require('../models');
const { Op } = require('sequelize');

// Récupérer tous les artisans avec leur spécialité et leur catégorie
router.get('/', async (req, res) => {
    try {
        const artisans = await Artisan.findAll({
            include: [
                {
                    model: Specialite,
                    include: [Categorie]
                }
            ],
            order: [['nom', 'ASC']]
        });

        res.status(200).json(artisans);

    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des artisans.',
            error: error.message
        });
    }
});

// Récupérer les artisans avec la note la plus élevée
router.get('/top', async (req, res) => {
    try {
        const topArtisans = await Artisan.findAll({
            where: { top: true },
            include: [Specialite],
            order: [['note', 'DESC']],
            limit: 3 
        });
        res.status(200).json(topArtisans);
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des artisans avec la note la plus élevée.',
            error: error.message
        });
    }
});


// Récupérer les artisans par spécialité
router.get('/specialite/:id', async (req, res) => {
    const specialiteId = req.params.id;
    try {
        const specialite = await Specialite.findByPk(specialiteId, {
            include: Artisan
        });
        if (specialite) {
            res.status(200).json(specialite.Artisans);
        } else {
            res.status(404).json({
                message: 'Spécialité non trouvée.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des artisans par spécialité.',
            error: error.message
        });
    }
});

// Récupérer les artisans par catégorie
router.get('/categorie/:id', async (req, res) => {
    const categorieId = req.params.id;
    try {
        const artisans = await Artisan.findAll({
            include: [{
                model: Specialite,
                where: { id_categorie: categorieId },
                include: [Categorie]
            }],
            order: [['nom', 'ASC']]
        });
        res.status(200).json(artisans);
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des artisans par catégorie.',
            error: error.message
        });
    }
}); 


// Récupérer les artisans par nom
router.get('/search/:nom', async (req, res) => {
    const nom = req.params.nom;
    try {
        const artisans = await Artisan.findAll({
            where: {
                nom: {
                    [Op.like]: `%${nom}%`
                }
            },
            order: [['nom', 'ASC']]
        });
        res.status(200).json(artisans);
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la recherche des artisans par nom.',
            error: error.message
        });
    }
});

// Récupérer les artisans par ville
router.get('/ville/:ville', async (req, res) => {
    const ville = req.params.ville;
    try {
        const artisans = await Artisan.findAll({
            where: { ville: ville },
            order: [['nom', 'ASC']]
        });
        res.status(200).json(artisans);
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des artisans par ville.',
            error: error.message
        });
    }
}); 


// Récupérer un artisan par son ID
router.get('/:id', async (req, res) => {
    const artisanId = req.params.id;

    try {
        const artisan = await Artisan.findByPk(artisanId, {
            include: ['Specialite']
        });

        if (artisan) {
            res.status(200).json(artisan);
        } else {
            res.status(404).json({
                message: 'Artisan non trouvé.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération de l\'artisan.',
            error: error.message
        });
    }
});

module.exports = router;