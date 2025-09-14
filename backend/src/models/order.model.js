import { model, Schema } from "mongoose";
import { JuiceModel } from "./juice.model.js"; // koristi samo schema, ne model
import { OrderStatus } from "../constants/order_status.js";

// LatLng schema
export const LatLngSchema = new Schema({
  lat: { type: String, required: true },
  lng: { type: String, required: true },
});

// OrderItem schema
export const OrderItemSchema = new Schema({
  juice: { type: JuiceModel.schema, required: true }, // sub-document
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Order schema
const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true }, // niz OrderItem sub-documents
    status: { type: String, default: OrderStatus.NEW , required: true},
    user: { type: Schema.Types.ObjectId, required: true }, // foreign key
  },
  {
    timestamps: true, // automatski dodaje createdAt i updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Kreiranje i eksport modela
export const OrderModel = model("order", orderSchema);
