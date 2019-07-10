import { formatErrors } from '../utils/format-errors';
import Sequelize from 'sequelize';
const { Op } = Sequelize;

const getTimestamp = isoDate => new Date(isoDate).getTime();

export default {
  Query: {
    allOffices: (parent, args, { models, isAuth }) =>
      isAuth && models.Office.findAll({
        where: {
          estateId: { [Op.eq]: args.estateId }
        }
      }),
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
    updateOffice: (parent, args, { models, isAuth }) =>
      isAuth && models.Office.findAll({
        where: {
          estateId: { [Op.eq]: args.estateId }
        }
      }),
    deleteOffice: async (parent, { passphrase }, { models }) => {
      try {
        return passphrase === process.env.PASS_PHRASE
          ? await models.Office.destroy({
            where: {}
          }).then(() => ({
            ok: true
          }))
          : { ok: false };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    createOffice: async (parent, args, { models }) => {
      try {
        console.log(args);
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    }
  }
};
