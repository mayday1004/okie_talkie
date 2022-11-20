//處理Controller對資料庫進行操作時，因為異步產生的try/catch塊重複
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
