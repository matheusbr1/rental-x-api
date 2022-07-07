import multer from "multer"
import { resolve } from 'path'
import crypto from 'crypto'

// O multer é o resposável por receber os arquivos
// Os arquivos serão salvos na folder recebida e na raiz do projeto

const tmpFolder = resolve(__dirname, '..', '..', 'tmp')

export default {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      // Criando um hash para não haver nomes duplicados
      const fileHash = crypto.randomBytes(16).toString("hex")
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}