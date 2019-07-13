import Sequelize from 'sequelize';
import { or, and } from 'graphql-shield';
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
        role: { [Op.eq]: 'admin' }
      },
      raw: true
    }).then(({ role }) => role === 'admin');
  } else {
    return false;
  }
});

const isManager = rule()(async (parent, args, { models, req }, info) => {
  if (req.session && req.session.userId) {
    return models.User.scope('withoutPassword').findOne({
      where: {
        id: { [Op.eq]: req.session.userId },
        role: { [Op.eq]: 'manager' }
      },
      raw: true
    }).then(({ role }) => role === 'manager');
  } else {
    return false;
  }
});

const isAdminOrOwner = rule()(async (parent, args, { models, req }, info) => {
  if (req.session && req.session.userId) {
    return models.User.scope('withoutPassword').findOne({
      where: {
        id: { [Op.eq]: req.session.userId }
      },
      raw: true
    }).then(user =>
      user.role === 'admin' ||
      args.input.userId === req.session.userId
    );
  } else {
    return false;
  }
});

const userBelongsToSameOffice = rule()(async (parent, args, { models, req }, info) => {
  if (req.session && req.session.userId) {
    return models.User.scope('withoutPassword').findAll({
      where: {
        id: { [Op.or]: [args.input.userId, req.session.userId] }
      },
      raw: true
    }).then(async users =>
      users.reduce((userA, userB) =>
        userA.officeId === userB.officeId
      ));
  } else {
    return false;
  }
});

const estateBelongsToSameOffice = rule()(async (parent, args, { models, req }, info) => {
  if (req.session && req.session.userId) {
    return models.User.scope('withoutPassword').findOne({
      where: {
        id: req.session.userId,
        officeId: { [Op.eq]: args.input.officeId }
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
    allEstatesByOfficeId: isAuthenticated,
    allOffices: isAuthenticated,
    allUsers: isAdmin,
    allUsersByOfficeId: isAuthenticated
  },
  Mutation: {
    createEstate: isAdminOrManager,
    updateEstate: or(isAdmin, and(isManager, estateBelongsToSameOffice)),
    deleteEstate: or(isAdmin, and(isManager, estateBelongsToSameOffice)),
    createOffice: isAdmin,
    updateOffice: isAdmin,
    deleteOffice: isAdmin,
    createUser: isAdminOrManager,
    updateUser: or(isAdminOrOwner, and(isManager, userBelongsToSameOffice)),
    deleteUser: or(isAdmin, and(isManager, userBelongsToSameOffice))
  }
});
