import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = `${process.env.NEXT_PUBLIC_SECRET_KEY}`;
const iv = crypto.randomBytes(16);

export interface CryptoHash {
  iv: string;
  content: string;
}

export const encrypt = (text: string): CryptoHash => {
  console.log({ text, secretKey });
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};

export const decrypt = (hash: CryptoHash): string => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, 'hex')
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString();
};
