import fs from 'fs'

export const deleteFile = async(filename: string) => {
  try {
    // Verifica se o arquivo existe
    await fs.promises.stat(filename)  
  } catch (error) {
    return
  }

  // Remove o arquivo
  await fs.promises.unlink(filename)
}