import { model, Schema } from "mongoose";

// Možeš definisati prazan class ako želiš čuvati strukturu,
// ali u JS ti nije potreban za Mongoose rad
class Juice {
  id;
  name;
  price;
  tags;
  favorite;
  imageUrl;
  origins;
  prepareTime;
}

const JuiceSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String] },
    favorite: { type: Boolean, required: false },
    imageUrl: { type: String, required: true },
    origins: { type: [String], required: true },
    prepareTime: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const JuiceModel = model("juice", JuiceSchema);
