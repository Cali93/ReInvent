'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`INSERT INTO offices(name, country, cover, emails, created_at, updated_at) VALUES
    ('ReInvent Brussels','Belgium','http://dummyimage.com/480x270.png/ff4444/ffffff','[{}]', '2019-01-08', '2019-01-08'),
    ('ReInvent Ghent','Belgium','http://dummyimage.com/480x270.png/cc0000/ffffff','[{},{},{},{},{}]', '2019-01-08', '2019-01-08'),
    ('ReInvent Brugges','Belgium','http://dummyimage.com/480x270.png/cc0000/ffffff','[{},{}]', '2019-01-08', '2019-01-08'),
    ('ReInvent Liège','Belgium','http://dummyimage.com/480x270.png/ff4444/ffffff','[{},{},{},{}]', '2019-01-08', '2019-01-08'),
    ('ReInvent Namur','Belgium','http://dummyimage.com/480x270.png/5fa2dd/ffffff','[{},{}]', '2019-01-08', '2019-01-08')`);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
