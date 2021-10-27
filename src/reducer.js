const reducer = (state, action) => {
  throw new Error(`no matching "${action.type}" action type`);
};
export default reducer;
