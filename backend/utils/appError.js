// 統一顯示錯誤的訊息格式
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    //記得補上`statusCode`.startsWith('4')
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
    // 判斷當前發生的錯誤是不是我們預測中的
    this.isOperational = true;

    //顯示錯誤發生的檔案
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
