import { formatErrors } from '../utils/format-errors';
import Sequelize from 'sequelize';

const { Op } = Sequelize;

export default {
  Query: {
    allEstates: (parent, args, { models }) => models.Estate.findAll({
      where: {
        archivedAt: { [Op.eq]: null }
      },
      raw: true,
      order: [
        ['name', 'ASC']
      ]
    })
  },
  Mutation: {
    createEstate: async (parent, args, { models, isAuth }) => {
      try {
        isAuth && await models.Estate.create(args);
        return {
          ok: true
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    updateEstate: async (parent, { input: { name, cover, estateId } }, { models }) => {
      try {
        await models.Estate.update(
          { name, cover },
          { where: { id: { [Op.eq]: estateId } } }
        );
        return {
          ok: true
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    archiveEstate: async (parent, { id }, { models, isAuth }) => {
      try {
        isAuth && await models.Estate.update(
          { archivedAt: Date.now() },
          { where: { id: { [Op.eq]: id } } }
        );
        return {
          ok: true
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    deleteEstate: async (parent, { id }, { models }) => {
      try {
        await models.Estate.destroy(
          { where: { id: { [Op.eq]: id } } }
        );
        return {
          ok: true
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    }
  }
};
