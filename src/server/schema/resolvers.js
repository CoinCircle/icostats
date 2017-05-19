import User from 'models/user';
import Todo from 'models/todo';

export default {
  Query: {
    async users() {
      const results = await User.find();

      return results;
    },
    async todos() {
      const result = await Todo.find();

      return result;
    }
  },
  Mutation: {
    async addUser(_, { username }) {
      const doc = await User.create({ username });

      return doc;
    }
  }
};
