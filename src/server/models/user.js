import mongoose, { Schema } from 'mongoose';

/* =============================================================================
=    User
============================================================================= */
const UserSchema = new Schema({

  /**
  * username.
  */
  username: {
    type: String,
    unique: true
  }
});

export default mongoose.model('User', UserSchema);
