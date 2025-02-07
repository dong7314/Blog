import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ConfigType } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'; // v3 명령어 가져오기

import minioConfig from 'src/config/minio.config';

@Injectable()
export class ImageService {
  private s3: S3Client;

  constructor(
    @Inject(minioConfig.KEY) private config: ConfigType<typeof minioConfig>,
  ) {
    this.s3 = new S3Client({
      endpoint: this.config.endpoint,
      credentials: {
        accessKeyId: this.config.accessKey,
        secretAccessKey: this.config.secreKey,
      },
      forcePathStyle: true,
      region: 'us-east-1',
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const fileName = `${uuid()}-${file.originalname}`;
    const bucketName = 'dpost';

    // v3에서는 Command 객체를 생성해서 사용함
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read', // 공개 접근 가능 (필요시 변경)
    });

    try {
      // 명령어 실행
      await this.s3.send(command);
      return {
        url: `https://api-minio.ldy-studio.com/${bucketName}/${fileName}`,
      };
    } catch (error) {
      console.error('이미지 업로드가 실패하였습니다.', error);
      throw error; // 에러 처리
    }
  }
}
