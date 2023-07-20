
const JwtController = require('../../../middlewares/JsonWebToken/controller/jwt');
const userModel = require('../../User/model/user');

const userLogin = async (req, res, next) => {
    try {
        const userReqBody = req.body;
        const email = userReqBody.email;
        const password = userReqBody.password;

        // find user if exists in database and returning only its email and password crypted
        const findUser = await userModel.findOne({ email }, 'email password');

        if (findUser) {
            const userPassValid = findUser.validHashpass(password);

            if (userPassValid) {
                const payload = { email: findUser.email };
                const token = JwtController.signJwt(payload);

                return res.status(200).json({ message: 'User found!', token: token });

            } else {
                return res.status(404).json({ message: 'User not found! Please check your email and/or password.' });
            }

        } else {
            return res.status(404).json({ message: 'User not found! Please check your email and/or password.' });
        }

    } catch (error) {
        error.status = 400;
        error.description = 'BAD REQUEST';
        error.extra = {
            message: 'Error while login user'
        }
        console.log('login.controller.userLogin ::; ', { error });
        return next({ error });
    }
}

const objectModuleToExports = {
    userLogin
};

module.exports = objectModuleToExports;
