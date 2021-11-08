const db = require('../models')

const repo = {}

repo.getAll = async () => {
  return await db.BusinessCategory.findAll()
}

repo.getById = async (id) => {
  return await db.BusinessCategory.findByPk(id)
}


module.exports = repo