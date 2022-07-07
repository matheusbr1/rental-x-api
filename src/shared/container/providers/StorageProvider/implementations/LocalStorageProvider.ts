import upload from '@config/upload';
import fs from 'fs'
import { resolve } from 'path'

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    // Mudando o arquivo de pasta
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    )

    return file
  }

  async delete(file: string, folder): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file)

    try {
      // Verifica se o arquivo existe
      await fs.promises.stat(filename)  
    } catch (error) {
      return
    }
  
    // Remove o arquivo
    await fs.promises.unlink(filename)
  }
}

export { LocalStorageProvider }