import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Item } from './item';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    'mongodb://localhost:27017/loomi-db',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err: any) => console.log(err));

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(404).json({ message: 'No items found' }));
});

app.post('/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save()
    .then(item => res.json(item))
    .catch(err => res.status(500).json(err));
});

app.listen(3000, () => console.log('Server running...'));
