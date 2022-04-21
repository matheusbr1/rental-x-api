
import { Router } from "express";
import multer from 'multer'
import uploadConfig from '@config/upload'
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/uploadCarImagesController";

const carRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationsController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

// O multer é o resposável por receber os arquivos
const upload = multer(uploadConfig.upload('./tmp/cars'))

carRoutes.post(
  '/', 
  ensureAuthenticated, 
  ensureAdmin, 
  createCarController.handle
)

carRoutes.get(
  '/available', 
  listAvailableCarsController.handle
) 

carRoutes.post(
  '/specifications/:id', 
  ensureAuthenticated, 
  ensureAdmin, 
  createCarSpecificationsController.handle
)

carRoutes.post(
  '/images/:id',
  ensureAuthenticated, 
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle
)

export { carRoutes }