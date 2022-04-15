import express, { NextFunction, Request, Response } from 'express'
import "express-async-errors"
import "@shared/infra/typeorm" // Database
import "@shared/container"
import swaggerUI from 'swagger-ui-express'
import swaggerFile from '../../../swagger.json'
import { router } from './routes'
import { AppError } from '@shared/errors/AppError'

const app = express()

app.use(express.json())

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: `Interna server error - ${err.message}`
  })
})

const port = 3333

app.listen(3333, () => console.log(`Server is running on port ${port}!`))
