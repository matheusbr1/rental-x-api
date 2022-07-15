import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'
import { ProfileUserController } from '@modules/accounts/useCases/profileUser/ProfileUserController'

const usersRoutes = Router()

// O multer é o resposável por receber os arquivos
const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const profileUserController = new ProfileUserController()

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch(
  '/avatar', 
  ensureAuthenticated, // Verificando se está logado
  uploadAvatar.single('avatar'),  // Usando o multer como um middleware
  updateUserAvatarController.handle
)

usersRoutes.get(
  '/profile', 
  ensureAuthenticated, // Verificando se está logado
  profileUserController.handle
)

export { usersRoutes }