const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLList } = require('graphql')
const tagType = require('./tagType')

const dataType = new GraphQLObjectType({
    name: 'dataType',
    fields: {
        _id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        overview: {
            type: GraphQLString
        },
        poster_path: {
            type: GraphQLString
        },
        popularity: {
            type: GraphQLFloat
        },
        tag: {
            type: new GraphQLList(tagType)
        }
    }
})

module.exports = dataType