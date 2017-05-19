import React, { PropTypes } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const propTypes = {
  isFetching: PropTypes.bool,
  addUser: PropTypes.func.isRequired,
  users: PropTypes.array
};

const Home = ({ isFetching, addUser, users = []}) => (
  <div>
    <h3>Homepage</h3>
    <button
      onClick={() => !isFetching && addUser(`User${Date.now()}`)}
    >
      Add a user
    </button>
    <h5>Users</h5>
    <ul>
      {users.map(user =>
        <li key={user.username}>{user.username}</li>
      )}
    </ul>
  </div>
);

Home.propTypes = propTypes;

/**
 * Query Data
 */
const QUERY = gql`
  query getUsers {
    users {
      _id,
      username
    }
  }
`;
const mapDataToProps = result => ({
  users: result.data.users,
  isFetching: result.data.loading
});
const withData = graphql(QUERY, {
  props: mapDataToProps
});

/**
 * Query Actions
 */
const ACTIONS = gql`
  mutation addUser($username: String!) {
    addUser(username: $username) {
      _id,
      username
    }
  }
`;
const mapActionsToProps = ({ mutate }) => ({
  addUser: username => mutate({
    variables: { username },
    refetchQueries: ['getUsers']
  })
});
const withActions = graphql(ACTIONS, {
  props: mapActionsToProps
});

export default compose(withData, withActions)(Home);
