export default (db, DataTypes) => {
  const Estate = db.define('Estate', {
    name: DataTypes.STRING,
    cover: DataTypes.TEXT,
    archivedAt: { type: DataTypes.DATE, field: 'archived_at' }
  });

  Estate.associate = (models) => {
    Estate.belongsTo(models.Office);
  };

  return Estate;
};
