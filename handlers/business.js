const {
  GraphQLList, 
  GraphQLInt, 
  GraphQLString,
  GraphQLBoolean,
} = require('graphql')

const { 
  BusinessType, 
  LegalInformationType,
  OpeningHourType,
  dateScalar,
  timeScalar,
  DayOffType,
} = require('../types')

const { GraphQLUpload } = require('graphql-upload')
const businessUsecase = require('../usecases/business')

module.exports = () => ({
  queries: {
    businesses: {
      type: new GraphQLList(BusinessType),
      description: 'List of All Business',
      resolve: async () => await businessUsecase.getAll(),
    },
    business: {
      type: BusinessType,
      description: 'Get a single Business',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async (_, { id }) => await businessUsecase.getById(id),
    },
    legalInformation: {
      type: LegalInformationType,
      description: 'Get Legal Information of a Business',
      args: {
        businessId: { type: GraphQLInt }
      },
      resolve: async (_, { businessId }) => {
        return await businessUsecase.getLegalInformationByBusinessId(businessId)
      },
    },
    openingHours: {
      type: new GraphQLList(OpeningHourType),
      description: 'Get List of Business Opening Hours',
      args: {
        businessId: { type: GraphQLInt }
      },
      resolve: async (_, { businessId }) => {
        return await businessUsecase.getOpeningHoursByBusinessId(businessId)
      },
    },
    dayOffs: {
      type: new GraphQLList(DayOffType),
      description: 'Get List of Business Day Offs',
      args: {
        businessId: { type: GraphQLInt }
      },
      resolve: async (_, { businessId }) => {
        return await businessUsecase.getDayOffsByBusinessId(businessId)
      },
    },
  }, 
  mutations: {
    updateLegalInformation: {
      type: LegalInformationType,
      description: 'Update Legal Information',
      args: {
        businessId: { type: GraphQLInt },
        companyName: { type: GraphQLString },
        headOfCompany: { type: GraphQLString },
        taxNumber: { type: GraphQLString },
        ustId: { type: GraphQLString },
      },
      resolve: async (_, payload) => {
        return await businessUsecase.updateLegalInformation(payload)
      },
    },
    updateBasicInformation: {
      type: BusinessType,
      description: 'Update Basic Information',
      args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        businessCategoryId: { type: GraphQLInt },
      },
      resolve: async (_, payload) => {
        return await businessUsecase.updateBasicInformation(payload)
      },
    },
    updateBusinessContact: {
      type: BusinessType,
      description: 'Update Business Contact',
      args: {
        id: { type: GraphQLInt },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve: async (_, payload) => {
        return await businessUsecase.updateBusinessContact(payload)
      },
    },
    updateBusinessAddress: {
      type: BusinessType,
      description: 'Update Business Address',
      args: {
        id: { type: GraphQLInt },
        street: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        postalCode: { type: GraphQLString },
      },
      resolve: async (_, payload) => {
        return await businessUsecase.updateBusinessAddress(payload)
      },
    },
    uploadBusinessImages: {
      type: BusinessType,
      description: 'Upload Business Images',
      args: {
        id: { type: GraphQLInt },
        logo: { 
          description: 'Business Logo',
          type: GraphQLUpload, 
        },
        commercialImage: { 
          description: 'Business Commercial Image',
          type: GraphQLUpload,
        },
      },
      resolve: async (_, payload) => {
        return await businessUsecase.uploadBusinessImages(payload)
      },
    },
    createOpeningHour: {
      type: OpeningHourType,
      description: 'Create an Opening Hour',
      args: {
        businessId: { type: GraphQLInt },
        day: { type: GraphQLInt },
        timeStart: { type: timeScalar },
        timeEnd: { type: timeScalar },
      },
      resolve: async (_, payload) => {
        return await businessUsecase.createOpeningHour(payload)
      }
    },
    updateOpeningHour: {
      type: OpeningHourType,
      description: 'Update an Opening Hour',
      args: {
        id: { type: GraphQLInt },
        day: { type: GraphQLInt },
        timeStart: { type: timeScalar },
        timeEnd: { type: timeScalar },
      },
      resolve: async (_, payload) => {
        return await businessUsecase.updateOpeningHour(payload)
      }
    },
    deleteOpeningHourById: {
      type: GraphQLBoolean,
      description: 'Delete an Opening Hour',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: async (_, { id }) => {
        return await businessUsecase.deleteOpeningHourById(id)
      }
    },
    createDayOff: {
      type: DayOffType,
      description: 'Create a Business Day Off',
      args: {
        businessId: { type: GraphQLInt },
        nameOfDay: { type: GraphQLString },
        dateStart: { type: dateScalar },
        dateEnd: { type: dateScalar },
      },
      resolve: async (_, payload) => {
        return await businessUsecase.createDayOff(payload)
      }
    },
    updateDayOff: {
      type: DayOffType,
      description: 'Update a Business Day Off',
      args: {
        id: { type: GraphQLInt },
        nameOfDay: { type: GraphQLString },
        dateStart: { type: dateScalar },
        dateEnd: { type: dateScalar },
      },
      resolve: async (_, payload) => {
        return await businessUsecase.updateDayOff(payload)
      }
    },
    deleteDayOffById: {
      type: GraphQLBoolean,
      description: 'Delete a Business Day Off',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: async (_, { id }) => {
        return await businessUsecase.deleteDayOffById(id)
      }
    }
  }
})