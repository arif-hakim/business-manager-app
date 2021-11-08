const businessRepository = require('../repositories/business')
const Joi = require('joi')
const fs = require('fs')

const usecases = {}

usecases.getAll = () => {
  return businessRepository.getAll()
}

usecases.getById = (id) => {
  if (!id) return null
  return businessRepository.getById(id)
}

usecases.getLegalInformationByBusinessId = (businessId) => {
  if (!businessId) return null
  return businessRepository.getLegalInformationByBusinessId(businessId)
}

usecases.updateLegalInformation = async (payload) => {
  const { businessId } = payload
  if (!businessId) return false
  
  const validator = Joi.object({
    companyName: Joi.string().required().error(new Error('Company name is required!')),
    headOfCompany: Joi.string().required().error(new Error('Head of company is required!')),
    businessId: Joi.required().error(new Error('Business ID is required!')),
    taxNumber: Joi.optional(),
    ustId: Joi.optional(),
  })
  const { error } = validator.validate(payload)
  if (error) return error

  let response 
  const currentLegalInformation = await businessRepository.getLegalInformationByBusinessId(businessId)
  if (currentLegalInformation) {
    await businessRepository.updateLegalInformation(payload)
    response = currentLegalInformation.reload()
  }
  else response = await businessRepository.createLegalInformation(payload)
  return response
}

usecases.updateBasicInformation = async (payload) => {
  const { id } = payload
  if (!id) return false
  
  const validator = Joi.object({
    id: Joi.required().error(new Error('Business ID is required!')),
    name: Joi.string().required().error(new Error('Business name is required!')),
    businessCategoryId: Joi.required().error(new Error('Business category is required!')),
    description: Joi.optional(),
  })
  const { error } = validator.validate(payload)
  if (error) return error

  const currentBusiness = await businessRepository.getById(id)
  if (!currentBusiness) return new Error('Business not found!')
  await currentBusiness.update(payload)
  return currentBusiness.reload()
}

usecases.updateBusinessContact = async (payload) => {
  const { id } = payload
  if (!id) return false
  
  const validator = Joi.object({
    id: Joi.required().error(new Error('Business ID is required!')),
    phone: Joi.string().required().error(new Error('Phone is required!')),
    email: Joi.string().required().error(new Error('Email is required!')),
  })
  const { error } = validator.validate(payload)
  if (error) return error

  const currentBusiness = await businessRepository.getById(id)
  if (!currentBusiness) return new Error('Business not found!')
  await currentBusiness.update(payload)
  return currentBusiness.reload()
}

usecases.updateBusinessAddress = async (payload) => {
  const { id } = payload
  if (!id) return false
  
  const validator = Joi.object({
    id: Joi.required().error(new Error('Business ID is required!')),
    street: Joi.string().required().error(new Error('Street is required!')),
    city: Joi.string().required().error(new Error('City is required!')),
    state: Joi.string().required().error(new Error('State is required!')),
    country: Joi.string().required().error(new Error('Country is required!')),
    postalCode: Joi.optional(),
  })

  const { error } = validator.validate(payload)
  if (error) return error

  const currentBusiness = await businessRepository.getById(id)
  if (!currentBusiness) return new Error('Business not found!')
  await currentBusiness.update(payload)
  return currentBusiness.reload()
}


usecases.uploadBusinessImages = async (payload) => {
  const { logo, commercialImage, id } = await payload
  const { 
    createReadStream: logoFileStream, 
    filename: logoFilename, 
  } = await logo
  
  const { 
    createReadStream: commercialImageFileStream, 
    filename: commercialImageFilename
  } = await commercialImage

  let data = {}
  let logoDir = './assets/uploads/logo'
  
  let stream = logoFileStream()
  stream.pipe(fs.createWriteStream(`${logoDir}/${logoFilename}`))
  data.logo = logoFilename
  
  let commercialImageDir = './assets/uploads/commercial_images'
  stream = commercialImageFileStream()
  stream.pipe(fs.createWriteStream(`${commercialImageDir}/${commercialImageFilename}`))
  data.commercialImage = commercialImageFilename
  
  const currentBusiness = await businessRepository.getById(id)
  if (!currentBusiness) return new Error('Business not found!')

  if (currentBusiness.logo) await fs.unlink(`${logoDir}/${currentBusiness.logo}`, () => {}) // delete previous logo
  if (currentBusiness.commercialImage) await fs.unlink(`${commercialImageDir}/${currentBusiness.commercialImage}`, () => {}) // delete previous commercial image
  
  await currentBusiness.update(data)
  return currentBusiness.reload()
}

usecases.getOpeningHoursByBusinessId = async (businessId) => {
  return await businessRepository.getOpeningHoursByBusinessId(businessId)
}

usecases.createOpeningHour = async (payload) => {
  const { businessId } = payload
  if (!businessId) return new Error('Business not found!')

  const validator = Joi.object({
    businessId: Joi.required().error(new Error('Business ID is required!')),
    day: Joi.required().error(new Error('Day is required!')),
    timeStart: Joi.required().error(new Error('Time start is required!')),
    timeEnd: Joi.required().error(new Error('Time end is required!')),
  })

  const { error } = validator.validate(payload)
  if (error) return error

  const currentBusiness = await businessRepository.getById(businessId)
  if (!currentBusiness) return new Error('Business not found!')
  
  const isTimeStartOverlapping = await businessRepository.isTimeStartOverlapping(payload)
  const isTimeEndOverlapping = await businessRepository.isTimeEndOverlapping(payload)
  const isThereAnyOpeningHourInBetween = await businessRepository.isThereAnyOpeningHourInBetween(payload)

  if (isTimeStartOverlapping) return new Error('Time start is overlapping!')
  if (isTimeEndOverlapping) return new Error('Time end is overlapping!')
  if (isThereAnyOpeningHourInBetween) return new Error('There is another opening hour in between!')

  const openingHour = await businessRepository.createOpeningHour(payload)
  return openingHour
}

usecases.updateOpeningHour = async (payload) => {
  const { id } = payload
  if (!id) return new Error('Business not found!')

  const validator = Joi.object({
    id: Joi.required().error(new Error('Opening Hour ID is required!')),
    day: Joi.required().error(new Error('Day is required!')),
    timeStart: Joi.required().error(new Error('Time start is required!')),
    timeEnd: Joi.required().error(new Error('Time end is required!')),
  })

  const { error } = validator.validate(payload)
  if (error) return error

  const currentOpeningHour = await businessRepository.getOpeningHourById(id)
  if (!currentOpeningHour) return new Error('Opening hour not found!')
  await currentOpeningHour.update(payload)
  return currentOpeningHour.reload()
}

usecases.deleteOpeningHourById = async (id) => {
  return await businessRepository.deleteOpeningHour(id)
}

usecases.getDayOffsByBusinessId = async (businessId) => {
  return await businessRepository.getDayOffsByBusinessId(businessId)
}

usecases.createDayOff = async (payload) => {
  const { businessId } = payload
  if (!businessId) return new Error('Business not found!')

  const validator = Joi.object({
    businessId: Joi.required().error(new Error('Business ID is required!')),
    nameOfDay: Joi.required().error(new Error('Name of Day is required!')),
    dateStart: Joi.required().error(new Error('Date start is required!')),
    dateEnd: Joi.required().error(new Error('Date end is required!')),
  })

  const { error } = validator.validate(payload)
  if (error) return error

  const currentBusiness = await businessRepository.getById(businessId)
  if (!currentBusiness) return new Error('Business not found!')

  const dayOff = await businessRepository.createDayOff(payload)
  return dayOff
}

usecases.updateDayOff = async (payload) => {
  const { id } = payload
  if (!id) return new Error('Day Off ID is required!')

  const validator = Joi.object({
    id: Joi.required().error(new Error('Day Off ID is required!')),
    nameOfDay: Joi.required().error(new Error('Name of Day is required!')),
    dateStart: Joi.required().error(new Error('Date start is required!')),
    dateEnd: Joi.required().error(new Error('Date end is required!')),
  })

  const { error } = validator.validate(payload)
  if (error) return error

  const currentDayOff = await businessRepository.getDayOffById(id)
  if (!currentDayOff) return new Error('Day off not found!')

  await currentDayOff.update(payload)
  return currentDayOff.reload()
}

usecases.deleteDayOffById = async (id) => {
  return await businessRepository.deleteDayOffById(id)
}

module.exports = usecases