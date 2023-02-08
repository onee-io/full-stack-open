// 输出正常日志
const info = (...params) => console.log(...params);

// 输出错误日志
const error = (...params) => console.error(...params);

module.exports = { info, error };