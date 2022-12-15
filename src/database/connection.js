import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.DB_URL);
mongoose.Promise = global.Promise;

export default mongoose;