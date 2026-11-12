const express = require('express');
const router = express.Router();
const Specialite = require('../models/Specialite');


// Récupérer toutes les spécialités
router.get('/', async (req, res) => {
    try {
        const specialites = await Specialite.findAll({
            order: [['nom_specialite', 'ASC']] 
        });
        res.status(200).json(specialites);
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des spécialités.'
        });
    }
});

// Récupérer une spécialité par ID
router.get('/:id', async (req, res) => {
    const specialiteId = req.params.id;
    try {
        const specialite = await Specialite.findByPk(specialiteId);
        if (specialite) {
            res.status(200).json(specialite);
        } else {
            res.status(404).json({
                message: 'Spécialité non trouvée.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération de la spécialité.',
            error: error.message
        });
    }
}); 

// Ajouter une spécialité
router.post('/', async (req, res) => {
    const { nom_specialite, id_categorie } = req.body;
    try {
        const newSpecialite = await Specialite.create({ nom_specialite, id_categorie });
        res.status(201).json(newSpecialite);
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de l\'ajout de la spécialité.',
            error: error.message
        });
    }
});

// Modifier une spécialité
router.put('/:id', async (req, res) => {
    const specialiteId = req.params.id;
    const { nom_specialite, id_categorie } = req.body;
    try {
        const specialite = await Specialite.findByPk(specialiteId);
        if (specialite) {
            specialite.nom_specialite = nom_specialite;
            specialite.id_categorie = id_categorie;
            await specialite.save();
            res.status(200).json(specialite);
        } else {
            res.status(404).json({
                message: 'Spécialité non trouvée.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la modification de la spécialité.',
            error: error.message
        });
    }
});

// Supprimer une spécialité
router.delete('/:id', async (req, res) => {
    const specialiteId = req.params.id;
    try {
        const specialite = await Specialite.findByPk(specialiteId);
        if (!specialite) {
            res.status(404).json({
                message: 'Spécialité non trouvée.'
            });
            return;
        }
        await specialite.destroy();
        res.status(200).json({
            message: 'Spécialité supprimée avec succès.'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la suppression de la spécialité.',
            error: error.message
        });
    }
});

module.exports = router;