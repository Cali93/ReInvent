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
        id: { [Op.eq]: req.session.userId }
      },
      raw: true
    }).then(({ role }) => role === 'admin' || role === 'manager');
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

const isAdminOrOwner = rule()(async (parent, args, { models, req }, info) => {
  if (req.session && req.session.userId) {
    return models.User.scope('withoutPassword').findOne({
      where: {
        id: { [Op.eq]: req.session.userId },
        role: { [Op.or]: ['admin'] }
      },
      raw: true
    }).then(user => !!user.id || (args.id === req.session.userId));
  } else {
    return false;
  }
});

export const permissions = shield({
  Query: {
    getUser: isAuthenticated,
    allEstates: isAdmin,
    allEstatesByOfficeId: isAuthenticated,
    allOffices: isAuthenticated,
    allUsers: isAdmin,
    allUsersByOfficeId: isAuthenticated
  },
  Mutation: {
    createEstate: isAdminOrManager,
    updateEstate: isAdminOrManager,
    deleteEstate: isAdminOrManager,
    createOffice: isAdmin,
    updateOffice: isAdmin,
    deleteOffice: isAdmin,
    createUser: isAdminOrManager,
    updateUser: isAdminOrOwner,
    deleteUser: isAdminOrManager
  }
});
