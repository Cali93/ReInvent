import bcrypt from 'bcryptjs';

export default (db, DataTypes) => {
  const User = db.define(
    'User',
    {
      avatar: DataTypes.TEXT,
      firstName: {
        type: DataTypes.STRING,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name'
      },
      gender: DataTypes.STRING,
      googleId: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        required: true,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [8, 25],
            msg: 'The password must contain between 8 and 25 characters'
          }
        }
      },
      role: {
        type: DataTypes.ENUM('admin', 'manager', 'user'),
        field: 'role',
        defaultValue: 'user'
      }
    },
    {
      hooks: {
        afterValidate: async user => {
          if (user.password) {
            const hashedPassword = await bcrypt.hash(user.password, 12);
            user.password = hashedPassword;
          }
        }
      },
      scopes: {
        withoutPassword: {
          attributes: { exclude: ['password'] }
        }
      }
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Office, { foreignKey: 'officeId' });
  };

  return User;
};
