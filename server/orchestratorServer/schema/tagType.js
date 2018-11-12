const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql')

const tagType = new GraphQLObjectType({
    name: 'tagType',
    fields: {
        _id: {
            type: GraphQLID
        },
        text: {
            type: GraphQLString
        }
    }
})

module.exports = tagType