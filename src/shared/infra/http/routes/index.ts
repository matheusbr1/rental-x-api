import { Router } from 'express'
import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'
import { authenticateRoutes } from './authenticate.routes'
import { carRoutes } from './cars.routes'
import { rentalRoutes } from './rental.routes'
import { passwordRoutes } from './password.routes'

const router = Router()

router.use(authenticateRoutes)
router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationsRoutes)
router.use('/users', usersRoutes)
router.use('/cars', carRoutes)
router.use('/rentals', rentalRoutes)
router.use('/password', passwordRoutes)

export { router }