import { formatErrors } from '../utils/format-errors';
import Sequelize from 'sequelize';
const { Op } = Sequelize;

export default {
  Query: {
    allOffices: (parent, args, { models }) =>
      models.Office.findAll({ raw: true }).then(offices => ({ offices })),
    officeUsers: (parent, args, { models, isAuth }) =>
      isAuth && models.Office.findAll({
        where: {
          estateId: { [Op.eq]: args.estateId },
          isValid: { [Op.eq]: false }
        },
        include: [
          {
            model: models.Member,
            attributes: ['id', 'lastname', 'firstname', 'picture']
          }
        ]
      }).then(
        offices => {
          const membersOffices = offices.map(office => {
            const memberOffice = office.get({ plain: true });
            return memberOffice.Member;
          });
          const count = membersOffices.length;
          return {
            membersOffices,
            count
          };
        }
      )
  },
  Mutation: {
    updateOffice: async (parent, { input }, { models }) => {
      try {
        const { officeId, ...newData } = input;
        await models.Office.update(
          { ...newData },
          { where: { id: { [Op.eq]: officeId } } }
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
    deleteOffice: async (parent, { officeId }, { models }) => {
      try {
        await models.Office.destroy(
          { where: { id: { [Op.eq]: officeId } } }
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
    createOffice: async (parent, { input }, { models }) => {
      try {
        await models.Office.create(input);
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
