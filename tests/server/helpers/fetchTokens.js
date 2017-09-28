import mongoose from 'mongoose';
import settings from 'settings';
import { TokenSchema } from 'server/models/Token';

const conn = mongoose.createConnection(settings.MONGO_URI);
const Token = conn.model('Token', TokenSchema);

export default async function fetchTokens() {
  try {
    const tokens = await Token.find().lean().exec();

    return tokens;
  } catch (e) {
    throw Error(e)
  }
}
