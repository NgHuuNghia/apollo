const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');
const mongodb = require('mongoose');
const cors = require('cors');

const app = express();

//alow cross-origin request
app.use(cors());

mongodb.connect('mongodb+srv://nghia:nghia@graphqldb-isv1o.mongodb.net/test',{
  useUnifiedTopology: true,
  useNewUrlParser: true,
  }).then(() => console.log('DB Connected!'))
  .catch(err => { 
  console.log(`DB Connection Error: ${err.message}`);
  });
  
mongodb.connection.once('open',()=>{
  console.log('connect mongoDB');
})

app.use('/graphql',graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true
  })
);

app.listen(4000,()=>{
    console.log('server running in port 4000');
});