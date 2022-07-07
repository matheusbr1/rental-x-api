import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const categoriesRoutes = Router()

// O multer é o resposável por receber os arquivos
const upload = multer(uploadConfig)

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoryController = new ListCategoriesController()

categoriesRoutes.post(
  '/', 
  ensureAuthenticated, 
  ensureAdmin, 
  createCategoryController.handle
)

categoriesRoutes.get('/', listCategoryController.handle)


categoriesRoutes.post(
  '/import',  
  ensureAuthenticated,  // Verificando se está logado
  ensureAdmin, // Verificando se é admin
  upload.single('file'),  // Usando o multer como um middleware
  importCategoryController.handle
)

export { categoriesRoutes }