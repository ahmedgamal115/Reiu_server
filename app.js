const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./Utilities/backendSchema')
const resolvers = require('./resolvers')
const dbConnect = require('./Utilities/dbConnection')
const Models = require('./Models')
const cron = require('node-cron');
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');

const app = express()
const port = process.env.PORT || 3000

app.use(graphqlUploadExpress());
app.use('/images', express.static('images'));

dbConnect()
const updateExpired = async()=>{
    let currentDate = new Date()
    await Models.promocodes.updateMany(
        {expire:{$lt: currentDate},expired:false},
        {$set:{ expired: true }}
    )
}
const serverql = async()=>{
    const server = new ApolloServer({
        introspection: true,
        typeDefs,
        resolvers,
        context: ()=>{
            return {Models}
        }
    })
    await server.start()
    server.applyMiddleware({app, path: '/api'})
}


cron.schedule('* * * * *', async () => {
    try {
      await updateExpired();
    } catch (error) {
      console.error('Error updating expired promo code:', error);
    }
});

serverql()

app.listen(port, () => {
    console.log(`http://localhost:3000`)
})