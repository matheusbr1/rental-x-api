import multer from "multer"
import { resolve } from 'path'
import crypto from 'crypto'

// O multer é o resposável por receber os arquivos
// Os arquivos serão salvos na folder recebida e na raiz do projeto

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          // Criando um hash para não haver nomes duplicados
          const fileHash = crypto.randomBytes(16).toString("hex")
          const fileName = `${fileHash}-${file.originalname}`

          return callback(null, fileName)
        }
      })
    }
  }
}