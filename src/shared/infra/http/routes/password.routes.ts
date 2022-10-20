import { Router } from 'express'
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController'
import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/resetPasswordUserController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { VerifyPasswordMatchController } from '@modules/accounts/useCases/verifyPasswordMatch/verifyPasswordMatchController'

const passwordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordUserController = new ResetPasswordUserController()
const verifyPasswordMatchController = new VerifyPasswordMatchController()

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle)
passwordRoutes.post('/reset', resetPasswordUserController.handle)

passwordRoutes.post(
  '/verify', 
  ensureAuthenticated, // Verificando se está logado
  verifyPasswordMatchController.handle
)

export { passwordRoutes }