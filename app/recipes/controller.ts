import { Router } from 'express';
import { Recipe } from './model';

const controller = Router()
  .get('/', async (req, res) => {
    try {
      const halloumiFilter = Boolean(req.query.halloumi)
        ? { containsHalloumi: true }
        : null;

      const searchFilter = req.query.search
        ? {
            $or: ['name', 'body', 'link'].map(prop => ({
              [prop]: {
                $regex: String(req.query.search),
                $options: 'i'
              }
            }))
          }
        : null;

      const recipes = await Recipe.find({
        $and: [halloumiFilter || {}, searchFilter || {}]
      });

      res.json(
        recipes.sort((r1, r2) => Number(r2.updated) - Number(r1.updated))
      );
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .post('/', async (req, res) => {
    try {
      const { _id, ...body } = req.body; // Prevent id from being set manually
      const recipe = await new Recipe(body).save();
      res.json(recipe);
    } catch (err) {
      res.status(400).json(err);
    }
  })
  .get('/:id', async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ _id: req.params.id });
      if (recipe == null) {
        res.status(404).json({ message: 'Recipe not found.' });
      } else {
        res.json(recipe);
      }
    } catch (err) {
      res.status(500).json(err);
    }
    Recipe.findOne({ _id: req.params.id })
      .then(recipe => {})
      .catch(err => res.status(500).json(err));
  })
  .patch('/:id', async (req, res) => {
    try {
      const info: any = await Recipe.updateOne(
        { _id: req.params.id },
        { ...req.body, updated: Date.now() }
      );
      if (info.nModified === 0) {
        res.status(404).json({ message: 'Recipe not found.' });
      } else {
        const recipe = await Recipe.findOne({ _id: req.params.id });
        res.json(recipe);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .delete('/:id', async (req, res) => {
    try {
      const info: any = await Recipe.deleteOne({ _id: req.params.id });
      if (info.deletedCount === 0) {
        res.status(404).json({ message: 'Recipe not found.' });
      } else {
        res.json({});
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default controller;
