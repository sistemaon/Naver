
const userModel = require('../model/user');

const create = async (req, res, next) => {
    
    res.setHeader('Content-Type', 'application/json');
    try {
        const userReqBody = req.body
        const email = userReqBody.email
        const password = userReqBody.password
        const userObjectToCreate = {
            email, password
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
        return next({ error });
    }
};

const objectModuleToExports = {
    create
};

module.exports = objectModuleToExports;
