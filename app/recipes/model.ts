import { Document, Schema, model } from 'mongoose';

export interface IRecipe extends Document {
  name: string;
  link?: string;
  notes?: string;
  containsHalloumi: boolean;
  created: Date;
  updated: Date;
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
  containsHalloumi: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

export const Recipe = model<IRecipe>('recipe', RecipeSchema);
