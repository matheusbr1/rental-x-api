import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'

const usersRoutes = Router()

// O multer é o resposável por receber os arquivos
const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch(
  '/avatar', 
  ensureAuthenticated, // Verificando se está logado
  uploadAvatar.single('avatar'),  // Usando o multer como um middleware
  updateUserAvatarController.handle
)

export { usersRoutes }