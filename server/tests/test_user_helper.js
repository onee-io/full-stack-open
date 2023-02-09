const User = require('../models/user');

const initialUsers = [
    // TODO
];

// 生成一个不存在的用户 ID
const nonExistingId = async () => {
    const user = new User({
        // TODO
    });
    await user.save();
    await user.remove();
    return user._id.toString();
};

// 返回数据库中所有用户
const usersInDb = async () => {
    const users = await User.find({});
    return users.map(blog => blog.toJSON());
};

module.exports = {
    initialUsers,
    nonExistingId,
    usersInDb
};