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

const isAdmin = rule()(async (parent, args, { models, req }, info) => {
  if (req.session && req.session.userId) {
    return models.User.scope('withoutPassword').findOne({
      where: {
        id: { [Op.eq]: req.session.userId },
        role: { [Op.eq]: 'admin' }
      },
      raw: true
    }).then(user => user.role === 'admin');
  } else {
    return false;
  }
});

export const permissions = shield({
  Query: {
    getUser: isAuthenticated
  }
});
