import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import { API_CONFIG } from 'config';
import { formatErrors } from '../../utils/format-errors';
import { pickRandomItem } from '../../utils/helpers';

export default {
  Query: {
    getUser: async (_parent, _args, { models, req }) => {
      try {
        const user = await models.User.scope('withoutPassword').findOne(
          {
            where: { id: req.session.userId },
            raw: true
          }
        );
        return {
          ok: true,
          user
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    allUsers: (parent, args, { models }) => models.User.findAll({
      raw: true,
      order: [
        ['firstName', 'ASC']
      ]
    }),
    allUsersByOfficeId: (parent, { officeId }, { models }) => models.User.findAll({
      where: {
        office_id: officeId
      },
      raw: true,
      order: [
        ['firstName', 'ASC']
      ]
    })
  },
  Mutation: {
    register: async (_parent, { input }, { models }) => {
      try {
        const user = await models.User.create(input).then(userRes => {
          userRes.setOffice(pickRandomItem([1, 2, 3, 4]));
          const { password, ...userInfos } = userRes.get({ plain: true });
          return userInfos;
        });
        return {
          ok: true,
          user
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    createUser: async (_parent, { input }, { models }) => {
      try {
        const password = v4().substring(0, 20);
        const user = await models.User.create({ ...input, password }).then(userRes => {
          const { password, ...userInfos } = userRes.get({ plain: true });
          return userInfos;
        });
        return {
          ok: true,
          user
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    updateUser: async (parent, { input }, { models }) => {
      try {
        const { userId, ...newData } = input;
        await models.User.update(
          { ...newData },
          { where: { id: userId } }
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
    login: async (_parent, { email, password }, { models, req }) => {
      try {
        const user = await models.User.findOne({
          where: { email },
          raw: true
        });

        if (!user) {
          return {
            ok: false,
            errors: [
              {
                path: 'authenticate',
                message: 'Wrong credentials'
              }
            ]
          };
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          return {
            ok: false,
            errors: [
              {
                path: 'authenticate',
                message: 'Wrong credentials'
              }
            ]
          };
        }

        req.session.userId = user.id;

        return {
          ok: true,
          user
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    logout: async (_parent, _args, { req, res }) => {
      return new Promise((resolve, reject) =>
        req.session.destroy(err => {
          if (err) {
            console.log(err);
            reject({ ok: false });
          }
          res.clearCookie(API_CONFIG.session.name);
          return resolve({ ok: true });
        })
      );
    },
    deleteUser: async (parent, { id }, { models }) => {
      try {
        await models.User.destroy(
          { where: { id } }
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
