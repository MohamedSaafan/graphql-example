const graphql = require("graphql");
const _ = require("lodash");

// sum dummy data
const books = [
  { name: "book1", genre: "literature", id: "1", authorID: "2" },
  { name: "book2", genre: "science", id: "2", authorID: "1" },
  { name: "book3", genre: "technology", id: "3", authorID: "2" },
];
const authors = [
  { name: "Mohamed", age: 21, id: "1", books: ["2"] },
  { name: "Eid", age: 16, id: "2", books: ["1", "3"] },
  { name: "Mahmoud", age: 20, id: "3", books: [] },
];

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

// Book Type

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorID: { type: GraphQLID },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorID });
      },
    },
  }),
});

// Author Types

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    id: { type: GraphQLID },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorID: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});

// const graphql = require("graphql");
// const _ = require("lodash");

// // sum dummy data
// const books = [
//   { name: "book1", genre: "literature", id: "1" },
//   { name: "book2", genre: "science", id: "2" },
//   { name: "book3", genre: "technology", id: "3" },
// ];

// const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// const BookType = new GraphQLObjectType({
//   name: "Book",
//   fields: () => ({
//     id: { type: GraphQLString },
//     name: { type: GraphQLString },
//     genre: { type: GraphQLString },
//   }),
// });

// const RootQuery = new GraphQLObjectType({
//   name: "RootQueryType",
//   fields: {
//     book: {
//       type: BookType,
//       args: {
//         id: { type: GraphQLString },
//       },
//       resolve(parent, args) {
//         // code to get the data from db and let you do logic
//         // you will have the id in the args
//         // args.id
//         return _.find(books, { id: args.id });
//       },
//     },
//   },
// });

// module.exports = new graphql.GraphQLSchema({
//   query: RootQuery,
// });
