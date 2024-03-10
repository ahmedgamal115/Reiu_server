const Query = require('./Query')
const Mutation = require('./Mutation')
const Orders = require('./orders')
const Product = require('./product')
const {GraphQLDateTime} = require('graphql-iso-date')
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");

module.exports = {
    Query,
    Mutation,
    Orders,
    Product,
    DateTime: GraphQLDateTime,
    Upload: GraphQLUpload
}