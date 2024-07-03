import mongoose, { Schema } from "mongoose";
import moment from 'moment'

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    createdAt: { type: Date, default: Date.now }
  }, {
    minimize: false,
    timestamps: true
  });
  
  // Override the toJSON method to format createdAt
  userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    obj.createdAt = moment(obj.createdAt).format('DD-MM-YYYY HH:mm:ss'); // Formato personalizado
    return obj;
  };

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;