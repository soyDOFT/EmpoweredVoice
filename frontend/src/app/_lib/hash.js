import crypto from 'crypto';

export function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');

    const hashedPassword = crypto.scryptSync(password, salt, 64);
    return hashedPassword.toString('hex') + ':' + salt;
}

export function verifyPassword(storedPassword, suppliedPassword) {
    const [ hashedPassword, salt ] = storedPassword.split(':');
    const hashedPasswordBuffer = Buffer.from(hashedPassword, 'hex');
    const suppliedPasswordBuffer = crypto.scryptSync(suppliedPassword, salt, 64);
    console.log('stored buffer', hashedPasswordBuffer)
    console.log('supplied buffer', suppliedPasswordBuffer)
    return crypto.timingSafeEqual(hashedPasswordBuffer, suppliedPasswordBuffer);
}