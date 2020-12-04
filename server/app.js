const express = require("express");

const app = express();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

app.use(
  "/graphql",
  graphqlHTTP({
    // here you should specify the graphql schema it is required option
    schema,
    graphiql: true,
  })
);

app.get("/", (req, res, next) => {
  res.send("hello world!!");
});

app.listen(3000);
