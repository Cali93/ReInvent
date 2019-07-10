import { formatErrors } from '../utils/format-errors';
import Sequelize from 'sequelize';
import { closestDate } from '../utils/closestDate';
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
        const member = await models.Member.findByPk(args.memberId);
        const {
          subscriptionType,
          subBeginsAt,
          subEndsAt,
          memberType
        } = member.dataValues;

        const estates = await models.Estate.findAll({
          where: {
            lessonType: {
              [Op.eq]: memberType
            }
          }
        });

        const currentDate = Date.now();
        const estatesByType = estates.map(
          estate => estate.dataValues
        );

        const classBeginDates = estatesByType.map(
          estate => estate.beginsAt
        );

        const closestClass = closestDate(classBeginDates);
        const neededClass = estatesByType[closestClass];

        const existingOffices = await models.Office.findAll({
          where: {
            memberId: { [Op.eq]: args.memberId },
            estateId: { [Op.eq]: neededClass.id }
          }
        });

        if (existingOffices.length > 0) {
          return {
            ok: false,
            errors: [{
              path: 'existing_chekin',
              message: 'A office for this isAuth already exists in this estate'
            }]
          };
        } else {
          if (
            getTimestamp(subBeginsAt) <= currentDate &&
            getTimestamp(subEndsAt) >= currentDate &&
            neededClass.length !== 0
          ) {
            args.estateId = neededClass.id;
            args.isValid = true;
            await models.Office.create(args);
            return {
              ok: true,
              isValid: true
            };
          }

          if (
            (getTimestamp(subBeginsAt) > currentDate ||
              getTimestamp(subEndsAt) < currentDate) &&
            neededClass.length !== 0
          ) {
            args.estateId = neededClass.id;
            args.isValid = false;
            await models.Office.create(args);
            return {
              ok: true,
              isValid: false
            };
          }
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    }
  }
};
