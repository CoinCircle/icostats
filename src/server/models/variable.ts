import * as mongoose from 'mongoose';

export interface IVariable extends mongoose.Document {
  _id:  string;
  value: string | number | boolean;
}

const VariableSchema = new mongoose.Schema({
  value: {
    type: mongoose.Schema.Types.Mixed
  }
});

export default mongoose.model<IVariable>('Variable', VariableSchema);
