import mongoose, { Schema } from 'mongoose';

/* =============================================================================
=    Todo
============================================================================= */
const TodoSchema = new Schema({

  /**
   * owner
   */
  _owner: Schema.Types.ObjectId,

  /**
   * title
   */
  title: String,

  /**
   * completed
   */
  completed: Boolean
});

export default mongoose.model('Todo', TodoSchema);
