/* eslint-disable max-nested-callbacks */
import { expect } from 'chai';
import User from '../../src/server/models/user';

describe('User', function () {

  it('can create a user', async function () {
    let user = new User({
      username: 'cool_user'
    });

    await user.save();

    user = await User.findOne({ username: 'cool_user' });

    expect(user.username).to.equal('cool_user');
  });
});
