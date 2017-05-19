/* eslint-disable prefer-arrow-callback, no-magic-numbers */
import app from 'app';
import User from 'models/user';

/**
* Return a single user.
*/
app.get('/api/users/:userId', async function (req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
* Return a list of users.
*/
app.get('/api/users', async function (req, res) {
  try {
    const users = await User.find();

    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * Add a user
 */
app.post('/api/users', async function (req, res) {
  const { username } = req.body;

  try {
    await User.create({ username });

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
