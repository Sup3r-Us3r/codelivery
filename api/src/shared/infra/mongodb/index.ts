import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect(String(process.env.MONGO_URI), {
})
  .then(() => console.log('Mongodb has been connected'))
  .catch(error => console.log(error));
