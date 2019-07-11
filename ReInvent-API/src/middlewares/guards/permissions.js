import Sequelize from 'sequelize';
const { Op } = Sequelize;
const { rule, shield } = require('graphql-shield');

const isAuthenticated = rule()(async (parent, args, { models, req }, info) => {
  if (req.session && req.session.userId) {
    return models.User.scope('withoutPassword').findOne({
      where: { id: { [Op.eq]: req.session.userId } },
      raw: true
    }).then(user => !!user.id);
  }
});

const isAdminOrManager = rule()(async (parent, args, { models, req }, info) => {
  if (req.session && req.session.userId) {
    return models.User.scope('withoutPassword').findOne({
      where: {
        id: { [Op.eq]: req.session.userId },
        role: { [Op.or]: ['admin', 'manager'] }
      },
      raw: true
    }).then(user => !!user.id);
  } else {
    return false;
  }
});

const isAdmin = rule()(async (parent, args, { models, req }, info) => {
  if (req.session && req.session.userId) {
    return models.User.scope('withoutPassword').findOne({
      where: {
        id: { [Op.eq]: req.session.userId },
        role: { [Op.or]: ['admin'] }
      },
      raw: true
    }).then(user => !!user.id);
  } else {
    return false;
  }
});

export const permissions = shield({
  Query: {
    getUser: isAuthenticated,
    allEstates: isAdmin,
    // allEstatesByOfficeManagerOrUser: isAuthenticated,
    allOffices: isAuthenticated,
    allUsers: isAdminOrManager
  },
  Mutation: {
    createEstate: isAdminOrManager,
    updateEstate: isAdmin,
    // updateEstateByOfficeManager: isAdminOrManager,
    deleteEstate: isAdmin,
    // deleteEstateByOfficeManager: isAdminOrManager,
    createOffice: isAdmin,
    updateOffice: isAdmin,
    deleteOffice: isAdmin
  }
});
