/* eslint-disable */
export default /* GraphQL */`

# Users
type User {
  _id: ID!
  username: String!
}

# Todos
type Todo {
  _id: ID!
  _owner: User
  title: String
  completed: Boolean!
}

# the schema allows the following query:
type Query {
  users: [User]
  todos: [Todo]
}

# this schema allows the following mutation:
type Mutation {
  addUser (
    username: String!
  ): User
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`;
