export default (db, DataTypes) => {
  const Office = db.define('Office', {
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    cover: DataTypes.TEXT,
    emails: {
      type: DataTypes.JSON
    }
  });

  Office.associate = (models) => {
    Office.hasMany(models.User, { foreignKey: 'officeId' });
    Office.hasMany(models.Estate, { foreignKey: 'officeId' });
  };

  return Office;
};
