import { CreateCarRentalsController } from '@modules/rentals/useCases/createRental/CreateRentalController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const rentalRoutes = Router()

const createRentalController = new CreateCarRentalsController()

rentalRoutes.post(
  '/', 
  ensureAuthenticated,
  createRentalController.handle
)

export { rentalRoutes }