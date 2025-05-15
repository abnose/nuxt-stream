import { promises as fs } from 'fs'
import path from 'path'

export async function handleUpload(
    newFile: any,
    uploadPath: string,
    oldFilePath?: string
) {
    if (!newFile?.filepath) return null

    const publicDir = path.resolve('./public')
    const saveDir = path.join(publicDir, uploadPath)
    await fs.mkdir(saveDir, { recursive: true })

    // ✅ Fix: prepend publicDir to the old path
    if (oldFilePath) {
        const oldFullPath = path.join(publicDir, oldFilePath)
        console.log(oldFullPath)
        try {
            await fs.unlink(oldFullPath)
            console.log('Deleted old file:', oldFullPath)
        } catch (err) {
            console.warn('Could not delete old file:', err.message)
        }
    }

    const fileExt = path.extname(newFile.originalFilename || '')
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${fileExt}`
    const savePath = path.join(saveDir, fileName)

    await fs.copyFile(newFile.filepath, savePath)

    return path.join(uploadPath, fileName).replace(/\\/g, '/')
}
