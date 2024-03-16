const { gql } = require("apollo-server-express");

module.exports = gql`
    scalar DateTime
    scalar Upload

    type Query{
        sizesFeed: [sizes]!
        sizesByWidth(width: Float!): [sizes]!
        sizesByHeight(height: Float!): [sizes]!

        productsFeed: [Product!]!
        product( id: ID! ): Product!
        productBySize( productSize: ID! ): [Product!]!

        promocodes: [PromoCodes!]!
        promocode( id: ID! ): PromoCodes!
        checkPromocode( code: String! ): PromoCodes!

        OrdersFeed:  [Orders!]!
    }
    type Product{
        id: ID!
        image: [String!]!
        productSize: sizes!
        price: Float!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type sizes{
        id: ID!
        height: Float!
        width: Float!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type PromoCodes{
        id: ID!
        code: String!
        discount: Float!
        expire: DateTime!
        expired: Boolean
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type Orders{
        id: ID!
        username: String!
        phone: String!
        otherPhone: String
        address: String!
        amount: [Float!]!
        delivered: Boolean
        customHeight: Float
        customWidth: Float
        customeImage: String
        customPrice: Float
        comment: String
        discountCode: PromoCodes
        productOrder: [Product!]!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type Mutation{
        addSizes(height: Float!,width: Float!): sizes!
        deleteSize( id: ID! ): String!
        updateSize( id: ID!,height: Float, width: Float ): sizes!

        addProduct( image: [Upload!]!, productSize: ID!, price: Float! ): Product!
        deleteProduct( id: ID! ): String!
        updateProduct( id: ID!, image: [Upload!], productSize: ID, price: Float, oldImage: [String!]! ) : Product!

        addPromoCode(code: String!,discount: Float!,expire: String!): PromoCodes!
        deletePromoCode( id: ID! ): String!
        updatePromoCode( id: ID!,code: String!,discount: Float!,expire: String! ): PromoCodes!
    
        
        makeOrder( username: String!,phone: String!,otherPhone: String,
            address: String!,amount: [Float!]!, customHeight: Float,
            customWidth: Float, customeImage: Upload, customPrice: Float, comment: String,
            discountCode: ID,productOrder: [ID!]): Orders!
        
        deliverOrder( id: ID! ): String!
        deleteOrder( id: ID! ): String!
    }
`