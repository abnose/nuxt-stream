import { IncomingForm } from 'formidable'
import type { H3Event } from 'h3'
import fs from 'fs'
import path from 'path'

export const parseFormData = async (event: H3Event): Promise<FormDataResult> => {
    const uploadDir = path.resolve('public/uploads/tmp')

    // ✅ Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
    }

    const form = new IncomingForm({
        multiples: false,
        uploadDir,
        keepExtensions: true,
    })

    return new Promise((resolve, reject) => {
        form.parse(event.node.req, (err, fields, files) => {
            if (err) return reject(err)
            resolve({ fields, files })
        })
    })
}

interface FormDataResult {
    fields: Record<string, any>
    files: Record<string, any>
}
