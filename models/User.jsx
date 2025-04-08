// models/User.js
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String,
    required: true,
    validate: {
      validator: function(pass) {
        return pass && pass.length >= 6;
      },
      message: 'Password must be at least 6 characters'
    }
  },
  fullName: {
    type: String,
    default:''
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  }
}, {timestamps: true});

const User = models.User || model('User', UserSchema);
export default User;
