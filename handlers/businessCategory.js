const {
  GraphQLList, GraphQLInt,
} = require('graphql')

const { BusinessCategoryType } = require('../types')
const businessCategoryUsecase = require('../usecases/businessCategory')

module.exports = () => ({
  businessCategories: {
    type: new GraphQLList(BusinessCategoryType),
    description: 'List of All Business Categories',
    resolve: async () => await businessCategoryUsecase.getAll(),
  },
  businessCategory: {
    type: BusinessCategoryType,
    description: 'Get a single Business Category',
    args: {
      id: { type: GraphQLInt }
    },
    resolve: async (_, { id }) => await businessCategoryUsecase.getById(id),
  },
})
