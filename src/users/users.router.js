const router = require('express').Router()

const userServices = require('./users.services')
const passportJWT = require('../middleware/auth.middleware')
const roleMiddleware= require('../middleware/role.middleware')

router.get("/", userServices.getAllUsers) //? /api/v1/users
router.post("/", userServices.postUser) //? /api/v1/users



//router.get("/:id", userServices.getUserById) //? /api/v1/users/:id
//router.patch('/:id', userServices.patchUser) //? /api/v1/users/:id
//router.delete('/:id', userServices.deleteUser) //? /api/v1/users/:id

router.route('/me')
    .get(passportJWT.authenticate('jwt', {session: false}), userServices.getMyUser)
    .patch(passportJWT.authenticate('jwt', {session: false}), userServices.patchMyUser)
    .delete(passportJWT.authenticate('jwt', {session: false}), userServices.deleteMyUser)

//rutas protegidas
router.route('/:id')
    .get(userServices.getUserById)
    .patch(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, userServices.patchUser)
    .delete(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, userServices.deleteUser)



module.exports = router