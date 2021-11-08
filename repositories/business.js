const db = require('../models')
const { Op } = require('sequelize')

const repo = {}

repo.getAll = async () => {
  return await db.Business.findAll()
}

repo.getById = async (id) => {
  return await db.Business.findByPk(id)
}

// LEGAL INFORMATIONS
repo.getLegalInformationByBusinessId = async (businessId) => {
  return await db.LegalInformation.findOne({
    where: {
      businessId
    }
  })
}

repo.createLegalInformation = async (payload) => {
  return await db.LegalInformation.create(payload)
}

repo.updateLegalInformation = async (payload) => {
  const { businessId } = payload
  return await db.LegalInformation.update(payload, {
    where: { businessId }
  })
}

// DAY OFFS
repo.getDayOffsByBusinessId = async (businessId) => {
  return await db.DayOff.findAll({
    where: {
      businessId
    }
  })
}

repo.getDayOffById = async (id) => {
  return await db.DayOff.findByPk(id)
}

repo.createDayOff = async (payload) => {
  return await db.DayOff.create(payload)
}

repo.updateDayOff = async (payload) => {
  const { id } = payload
  return await db.DayOff.update(payload, {
    where: { id }
  })
}

repo.deleteDayOffById = async (id) => {
  return await db.DayOff.destroy({ where: { id }})
}

// OPENING HOURS
repo.getOpeningHoursByBusinessId = async (businessId) => {
  return await db.OpeningHour.findAll({
    where: {
      businessId
    }
  })
}

repo.getOpeningHourById = async (id) => {
  return await db.OpeningHour.findByPk(id)
}

repo.createOpeningHour = async (payload) => {
  return await db.OpeningHour.create(payload)
}

repo.updateOpeningHour = async (payload) => {
  const { id } = payload
  return await db.OpeningHour.update(payload, {
    where: { id }
  })
}

repo.isTimeStartOverlapping = async (payload) => {
  const { businessId, timeStart, day } = payload
  return await db.OpeningHour.findOne({
    where: {
      [Op.and]: {
        businessId,
        day,
        [Op.and]: {
          timeStart: {
            [Op.lt]: timeStart,
          },
          timeEnd: {
            [Op.gt]: timeStart
          }
        }
      },
    }
  }) ? true : false
}

repo.isTimeEndOverlapping = async (payload) => {
  const { businessId, timeEnd, day } = payload
  return await db.OpeningHour.findOne({
    where: {
      [Op.and]: {
        businessId,
        day,
        [Op.and]: {
          timeStart: {
            [Op.lt]: timeEnd,
          },
          timeEnd: {
            [Op.gt]: timeEnd
          }
        }
      },
    }
  }) ? true : false
}

repo.isThereAnyOpeningHourInBetween = async (payload) => {
  const { businessId, timeStart, timeEnd, day } = payload
  return await db.OpeningHour.findOne({
    where: {
      [Op.and]: {
        businessId,
        day,
        [Op.and]: {
          timeStart: {
            [Op.gte]: timeStart,
          },
          timeEnd: {
            [Op.lte]: timeEnd
          }
        }
      },
    }
  }) ? true : false
}

repo.deleteOpeningHour = async (id) => {
  return await db.OpeningHour.destroy({ where: { id }})
}


module.exports = repo