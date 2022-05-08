import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import mongooseDelete from 'mongoose-delete'

const userSchema = new mongoose.Schema(
  {
    image: {
      type: String
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isWork: {
      type: Boolean,
    },
    isAdmin: {
      type: Boolean,
    },
    resetPasswordToken: String
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
   next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
 })

userSchema.plugin(mongooseDelete, {
  overrideMethods : 'all',
  deleteAt : true,
});

const User =  mongoose.model('User', userSchema);
export default User
