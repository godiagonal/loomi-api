import { Router } from 'express';
import { Recipe } from './model';

const controller = Router()
  .get('/', (req, res) => {
    Recipe.find()
      .then(items => res.json(items))
      .catch(err => res.status(404).json(err));
  })
  .post('/', (req, res) => {
    const newRecipe = new Recipe(req.body);
    newRecipe
      .save()
      .then(recipe => res.json(recipe))
      .catch(err => res.status(400).json(err));
  });

export default controller;
