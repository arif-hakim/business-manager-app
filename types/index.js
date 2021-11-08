const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLScalarType,
} = require('graphql')
const moment = require('moment')

const timeScalar = new GraphQLScalarType({
  name: 'Time',
  parseValue(value) {
    return value
  },
  serialize(value) {
    return value
  },
})

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    return value
  },
  serialize(value) {
    return value
  },
})

const businessCategoryUsecase = require('../usecases/businessCategory')
const businessUsecase = require('../usecases/business')

const BusinessCategoryType = new GraphQLObjectType({
  name: 'BusinessCategory',
  description: 'A single Business Category',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    createdAt: { type: dateScalar },
    updatedAt: { type: dateScalar },
  })
})

const BusinessType = new GraphQLObjectType({
  name: 'Business',
  description: 'A single Business',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLNonNull(GraphQLString) },
    phone: { type: GraphQLString },
    description: { type: GraphQLString },
    email: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    postalCode: { type: GraphQLString },
    logo: { type: GraphQLString },
    createdAt: { type: dateScalar },
    commercialImage: { type: GraphQLString },
    businessCategoryId: { type: GraphQLInt }, 
    businessCategory: { 
      type: BusinessCategoryType,
      resolve: async (business) => await businessCategoryUsecase.getById(business.businessCategoryId)
    },
    legalInformation: { 
      type: LegalInformationType,
      resolve: async (business) => await businessUsecase.getLegalInformationByBusinessId(business.id)
    },
    createdAt: { type: dateScalar },
    updatedAt: { type: dateScalar },
  })
})

const LegalInformationType = new GraphQLObjectType({
  name: 'LegalInformation',
  description: 'Legal Information of a Business',
  fields: () => ({
    id: { type: GraphQLInt },
    companyName: { type: GraphQLNonNull(GraphQLString) },
    headOfCompany: { type: GraphQLNonNull(GraphQLString) },
    taxNumber: { type: GraphQLString },
    ustId: { type: GraphQLString },
    createdAt: { type: dateScalar },
    updatedAt: { type: dateScalar },
  })
})

const DayOffType = new GraphQLObjectType({
  name: 'DayOff',
  description: 'A business day off',
  fields: () => ({
    id: { type: GraphQLInt },
    nameOfDay: { type: GraphQLNonNull(GraphQLString) },
    dateStart: { type: dateScalar },
    dateEnd: { type: dateScalar },
    createdAt: { type: dateScalar },
    updatedAt: { type: dateScalar },
  })
})

const OpeningHourType = new GraphQLObjectType({
  name: 'OpeningHour',
  description: 'A business opening hour',
  fields: () => ({
    id: { type: GraphQLInt },
    day: { type: GraphQLNonNull(GraphQLInt) },
    timeStart: { type: dateScalar },
    timeEnd: { type: dateScalar },
    createdAt: { type: dateScalar },
    updatedAt: { type: dateScalar },
  })
})

module.exports = {
  BusinessCategoryType,
  BusinessType,
  LegalInformationType,
  DayOffType,
  OpeningHourType,
  dateScalar,
  timeScalar,
}