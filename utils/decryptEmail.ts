import crypto from 'crypto'

export const decryptEmail = (hashedEmail: string, key: string): string => {
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(key, 'hex'),
        Buffer.alloc(16, 0)
    )
    let decrypted = decipher.update(hashedEmail, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}
