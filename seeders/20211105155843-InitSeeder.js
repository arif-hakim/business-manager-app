'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('business_categories', [
      {
        name: 'Food & Beverages',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Health & Medicine',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Computer & Electronics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Entertainment',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    await queryInterface.bulkInsert('businesses', [{
      name: 'Starbucks',
      businessCategoryId: 1,
      description: 'Starbucks branch in Bali',
      phone: '+49 (0)30 629 335 15',
      email: 'bali@starbucks.co.id',
      street: 'Jalan Bantan Kangin no. 103',
      city: 'Bali',
      state: 'Bali',
      country: 'Indonesia',
      postalCode: '40375',
      logo: 'starbucks.png',
      commercialImage: 'starbucks-commercial-images.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }])

    await queryInterface.bulkInsert('legal_informations', [
      {
        companyName: 'Starbucks Corporation',
        headOfCompany: 'Kevin Johnson',
        taxNumber: '0001234567890',
        ustId: 'DE398517849',
        businessId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    await queryInterface.bulkInsert('opening_hours', [
      {
        day: 6,
        timeStart: '08:00:00',
        timeEnd: '15:00:00',
        businessId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        day: 6,
        timeStart: '16:00:00',
        timeEnd: '22:00:00',
        businessId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        day: 0,
        timeStart: '08:00:00',
        timeEnd: '15:00:00',
        businessId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        day: 0,
        timeStart: '16:00:00',
        timeEnd: '20:00:00',
        businessId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    await queryInterface.bulkInsert('day_offs', [
      {
        nameOfDay: NewYears Holiday',
        dateStart: '2021-12-31',
        dateEnd: '2022-01-01',
        businessId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nameOfDay: ThanksGiving',
        dateStart: '2022-01-17',
        dateEnd: '2022-01-18',
        businessId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('day_offs', null, {})
    await queryInterface.bulkDelete('opening_hours', null, {})
    await queryInterface.bulkDelete('legal_informations', null, {})
    await queryInterface.bulkDelete('businesses', null, {})
    await queryInterface.bulkDelete('business_categories', null, {})
  }
};
