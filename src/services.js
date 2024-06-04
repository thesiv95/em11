import Users from './models/User.model.js';
import registerEvent from './registerEvent.js';

export const createUser = async (payload) => {
    return Users.create(payload);
};

export const getUsers = async (page = 1, limit = 20) => {
    return Users.findAll({
        limit,
        offset: (page - 1) * limit
    });
};

export const getUser = async (id) => {
    return Users.findByPk(id);
};

export const modifyUser = async (id, payload) => {
    const userToModify = await Users.findByPk(id);
    if (!userToModify) {
        return null;
    }
    userToModify.set(payload);
    await userToModify.save();

    return payload;
};

export const registerThisEvent = async (userId, action = '[unknown]', content = '[unknown]') => {
    return registerEvent(userId, action, content);
}