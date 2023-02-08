// 反转字符串
const reverse = (string) => string.split('').reverse().join('');

// 计算数组平均值
const average = (array) => {
    const reducer = (sum, item) => sum + item;
    return array.length === 0
        ? 0
        : array.reduce(reducer, 0) / array.length;
};

module.exports = {
    reverse,
    average,
};