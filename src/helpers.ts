export const paramsToObject = (params: any[]) => {
  return params.reduce(
    (acc, cur, index) => ({
      ...acc,
      ["$" + (index + 1)]: cur,
    }),
    {}
  );
};
