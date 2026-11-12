const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Categorie = require('../models/Categorie');
const Artisan = require('../models/Artisan');
const Specialite = require('../models/Specialite');

// Récupérer toutes les catégories
router.get('/', async (req, res) => {
    try {
        const categories = await Categorie.findAll({
            order: [['id_categorie', 'ASC']]
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des catégories.'
        });
    }
});



// Récupérer les catégories par nom
router.get('/search/:nom', async (req, res) => {
    const nom = req.params.nom;
    try {
        const categories = await Categorie.findAll({
            where: {
                nom_categorie: {
                    [Op.like]: `%${nom}%`
                }
            },
            order: [['nom_categorie', 'ASC']]
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la recherche des catégories par nom.',
            error: error.message
        });
    }
});


// Récupérer les catégories par spécialité
router.get('/specialite/:id', async (req, res) => {
    const specialiteId = req.params.id;
    try {
        const specialite = await Specialite.findByPk(specialiteId);
        if (!specialite) {
            res.status(404).json({
                message: 'Spécialité non trouvée.'
            });
            return;
        }
        const categories = await Categorie.findByPk(specialite.id_categorie);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des catégories par spécialité.',
            error: error.message
        });
    }
});

// Récupérer les catégories par artisan
router.get('/artisan/:id', async (req, res) => {
    const artisanId = req.params.id;
    try {
        const artisan = await Artisan.findByPk(artisanId);
        if (artisan) {
            return res.status(404).json({
                message: 'Artisan non trouvé.'
            });
        }
        const specialite = await Specialite.findByPk(artisan.id_specialite);
        if (!specialite) {
            return res.status(404).json({
                message: 'Spécialité non trouvée pour cet artisan.'
            });
        }
        const categorie = await Categorie.findByPk(specialite.id_categorie);
        res.status(200).json(categorie);
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des catégories par artisan.',
            error: error.message
        });
    }
});

// Récupérer les catégories par ville
router.get('/ville/:ville', async (req, res) => {
    const ville = req.params.ville;
    try {
        const categories = await Categorie.findAll({
            include: [{
                model: Specialite,
                include: [{
                    model: Artisan,
                    where: { ville: ville }
                }]
            }],
            order: [['nom_categorie', 'ASC']]
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des catégories par ville.',
            error: error.message
        });
    }
});

// Récupérer une catégorie par ID
router.get('/:id', async (req, res) => {
    const categorieId = req.params.id;
    try {
        const categorie = await Categorie.findByPk(categorieId);
        if (categorie) {
            res.status(200).json(categorie);
        } else {
            res.status(404).json({
                message: 'Catégorie non trouvée.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération de la catégorie.',
            error: error.message
        });
    }
});

module.exports = router;