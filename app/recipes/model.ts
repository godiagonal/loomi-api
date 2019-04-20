import { Document, Schema, model } from 'mongoose';

export interface IRecipe extends Document {
  name: string;
  containsHalloumi: boolean;
  link?: string;
  notes?: string;
  // coverImage?: Buffer;
  created: Date;
  updated: Date;
}

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  containsHalloumi: {
    type: Boolean,
    default: false
  },
  link: {
    type: String
  },
  notes: {
    type: String
  },
  // coverImage: {
  //   type: Buffer
  // },
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
