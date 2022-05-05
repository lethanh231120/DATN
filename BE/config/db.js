import mongoose from 'mongoose'

const connectDB = async() => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CONNECTION}.nvsuj.mongodb.net/${process.env.DB_DATABASENAME}?retryWrites=true&w=majority`,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongodb Connected Successfully');
  } catch (error) {
    console.log('fail');
  }
}

export default connectDB