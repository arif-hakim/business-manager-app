const businessCategoryRepository = require('../repositories/businessCategory')

const usecases = {}

usecases.getAll = () => {
  return businessCategoryRepository.getAll()
}

usecases.getById = (id) => {
  if (!id) return null
  return businessCategoryRepository.getById(id)
}

module.exports = usecases