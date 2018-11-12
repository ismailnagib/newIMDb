const { GraphQLSchema, GraphQLObjectType, GraphQLList } = require('graphql')
const dataType = require('./dataType')
const Movies = require('../controllers/movies')
const TVS = require('../controllers/tvs')

const GQLSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Root',
        fields: {
            movies: {
                type: new GraphQLList(dataType),
                resolve() {
                    let data = Movies.showAll()
                    return data
                }
            },
            tvs: {
                type: new GraphQLList(dataType),
                resolve() {
                    let data = TVS.showAll()
                    return data
                }
            }
        }
    })
})

module.exports = GQLSchema