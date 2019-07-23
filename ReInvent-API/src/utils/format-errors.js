export const formatErrors = (e, models) => {
  if (e instanceof models.Sequelize.ValidationError) {
    e.errors.map(({ path, message }) => ({ path, message }));
    return e.errors.map(({ path, message }) => ({ path, message }));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};
