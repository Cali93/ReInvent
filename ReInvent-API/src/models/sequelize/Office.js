export default (db, DataTypes) => {
  const Office = db.define('Office', {
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    cover: DataTypes.TEXT,
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
    }
  });

  Office.associate = (models) => {
    Office.hasMany(models.User);
    Office.hasMany(models.Estate);
  };

  return Office;
};
