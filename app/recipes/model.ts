import { Document, Schema, model } from 'mongoose';

export interface IRecipe extends Document {
  name: string;
  link: string;
  body: string;
  created: Date;
}

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  body: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export const Recipe = model<IRecipe>('recipe', RecipeSchema);
