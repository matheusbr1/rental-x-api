import { Router } from 'express'
import multer from 'multer'
import { createCategoryController } from '../modules/cars/useCases/createCategory'
import { listCategoriesController } from '../modules/cars/useCases/listCategories'
import { importCategoryController } from '../modules/cars/useCases/importCategory'

const categoriesRoutes = Router()

// O multer é o resposável por receber os arquivos
const upload = multer({
  dest: './tmp' // Os arquivos serão salvos nessa pasta
})

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response)
})

categoriesRoutes.get('/', (request, response) => {
 return listCategoriesController.handle(request, response)
})

// Usando o multer como um middleware
categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController.handle(request, response)
})

export { categoriesRoutes }