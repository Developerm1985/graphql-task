const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const app = express();

const users = [
  { username: "user1", password: "pass1@", token: "_dsjk2dlksjflk_dsfds" },
  { username: "user2", password: "pass2@", token: "sddfhkjhnvkemnx_dfueb" },
];

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    login(username: String!, password: String!): AuthResponse
  }

  type AuthResponse {
    success: Boolean
    message: String
    status: Int
    token: String
  }
`;

const resolvers = {
  Mutation: {
    login: (_, { username, password }) => {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        return {
          success: true,
          status: 200,
          message: "Login Successful!",
          token: user.token,
        };
      }
      return {
        success: false,
        status: 400,
        message: "Invalid username and password!",
      };
    },
  },
};

let server = null;

(async function () {
  server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
})();

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
