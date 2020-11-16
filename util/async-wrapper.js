module.exports.AsyncWrapper = function AsyncWraper(fn) {
  return (req, res, next) => {
    return fn(req, res).catch(next);
  };
};
