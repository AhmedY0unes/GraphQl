import { ApolloServer, gql } from 'apollo-server';
// gql is a function that takes a string and returns a GraphQL schema
// and can be used to validate the schema to see if it's correct
// graphql schema
const typeDefs = gql`
  schema {
    query: Query
  }
  type Query {
    greeting: String
  }
`;

// console.log(typeDefs);

const resolvers = {
  Query: {
    greeting: () => 'Hello world!',
  },
};

resolvers.Query.greeting = () => 'Hello world!';

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await server.listen({ port: 8080 });
console.log(`🚀 Server ready at ${url}`);
