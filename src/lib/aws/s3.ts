import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import dayjs from 'dayjs'

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const encodeImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

// ファイルタイプを判定してContent-Typeを設定
const getContentType = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase()

  switch (extension) {
    case 'svg':
      return 'image/svg+xml'
    case 'png':
      return 'image/png'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'gif':
      return 'image/gif'
    case 'webp':
      return 'image/webp'
    default:
      return 'application/octet-stream'
  }
}

// URLからS3キーを抽出するヘルパー関数
export const extractS3KeyFromUrl = (url: string): string => {
  try {
    // パターン1: https://bucket.s3.region.amazonaws.com/key
    if (url.includes('.amazonaws.com/')) {
      return url.split('.amazonaws.com/')[1]
    }

    // パターン2: https://s3.region.amazonaws.com/bucket/key
    if (url.includes('s3.') && url.includes('.amazonaws.com/')) {
      const parts = url.split('.amazonaws.com/')[1].split('/')
      return parts.slice(1).join('/') // bucket名を除いたキー部分
    }

    // フォールバック: URLの最後の部分を返す
    return url.split('/').slice(-2).join('/') // event/filename.jpg
  } catch (error) {
    console.error('Failed to extract S3 key from URL:', url, error)
    throw new Error('Invalid S3 URL format')
  }
}

export const uploadImage = async (file: File, fileName: string) => {
  const encodedImage = await encodeImage(file)
  const s3FileName = `${dayjs().format('YYYYMMDDHHmmssSSS')}_${fileName}`
  const key = `event/${s3FileName}`
  const contentType = getContentType(fileName)

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: Buffer.from(encodedImage.split(',')[1], 'base64'),
      ContentType: contentType,
      CacheControl: 'max-age=31536000', // 1年キャッシュ
    })
    return await s3Client.send(command).then(() => {
      const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
      return url
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export const deleteImage = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  })
  try {
    await s3Client.send(command)
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}
