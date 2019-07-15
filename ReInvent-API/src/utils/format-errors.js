export const formatErrors = (e, models) => {
  if (e instanceof models.db.ValidationError) {
    return e.errors.map(({ path, message }) => ({ path, message }));
  }
  return [{ path: 'name', message: `something went wrong : ${e}` }];
};
