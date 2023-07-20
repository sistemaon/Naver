
const userModel = require('../model/user');

const create = async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const userReqBody = req.body
        const email = userReqBody.email
        const password = userReqBody.password
        const username = userReqBody.username
        const userObjectToCreate = {
            email, password, username
        };

        const newUser = new userModel(userObjectToCreate);
        newUser.generateHashpass(userObjectToCreate.password);
        const user = await userModel.create(newUser);

        return res.status(201).json({ user });

    } catch (error) {
        error.status = 400;
        error.description = 'BAD REQUEST';
        error.extra = {
            message: 'Error while creating user'
        }
        console.log('user.controller.create ::; ', { error });
        return next({ error });
    }
};

const findAllUserNavers = async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const findAllNavers = await userModel.find({ _id: req.params.id }).populate("navers");

        return res.status(200).json({ navers: findAllNavers });

    } catch (error) {
        error.status = 400;
        error.description = 'BAD REQUEST';
        error.extra = {
            message: 'Error while fetching user navers'
        }
        console.log('user.controller.findAllUserNavers ::; ', { error });
        return next({ error });
    }
}

const find = async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const findUser = await userModel.find({ _id: req.params.id });

        return res.status(200).json({ user: findUser });

    } catch (error) {
        error.status = 400;
        error.description = 'BAD REQUEST';
        error.extra = {
            message: 'Error while finding user'
        }
        console.log('user.controller.find ::; ', { error });
        return next({ error });
    }
}

const update = async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const query = { _id: req.params.id };

        const userReqBody = req.body;
        const username = userReqBody.username;
        const email = userReqBody.email;

        const objectUserAttributesToUpdate = {
            username, email
        };
        await userModel.findOneAndUpdate(query, objectUserAttributesToUpdate);
        return res.status(204).json();

    } catch (error) {
        error.status = 400;
        error.description = 'BAD REQUEST';
        error.extra = {
            message: 'Error while updating user'
        }
        console.log('user.controller.update ::; ', { error });
        return next({ error });
    }
}

const remove = async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        await userModel.findOneAndDelete({ _id: req.params.id });

        return res.status(204).json();

    } catch (error) {
        error.status = 400;
        error.description = 'BAD REQUEST';
        error.extra = {
            message: 'Error while removing user'
        }
        console.log('user.controller.remove ::; ', { error });
        return next({ error });
    }
}

const objectModuleToExports = {
    create,
    findAllUserNavers,
    find,
    update,
    remove
}

module.exports = objectModuleToExports;
