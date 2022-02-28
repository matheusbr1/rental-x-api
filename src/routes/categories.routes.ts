import { Router } from 'express'
import multer from 'multer'
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController'

const categoriesRoutes = Router()

// O multer é o resposável por receber os arquivos
const upload = multer({
  dest: './tmp' // Os arquivos serão salvos nessa pasta
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoryController = new ListCategoriesController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', listCategoryController.handle)

// Usando o multer como um middleware
categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle)

export { categoriesRoutes }