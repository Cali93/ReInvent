import { formatErrors } from '../utils/format-errors';
import bcrypt from 'bcryptjs';

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
    }
  },
  Mutation: {
    register: async (_parent, { input }, { models }) => {
      try {
        const user = await models.User.create(input).then(userRes => {
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
          res.clearCookie('session_id');
          return resolve({ ok: true });
        })
      );
    }
  }
};
