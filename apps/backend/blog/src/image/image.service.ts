import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ConfigType } from '@nestjs/config';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'; // v3 명령어 가져오기

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
    // 한글 깨짐 현상 해결
    const originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    );
    const fileName = `${uuid()}-${originalname}`;

    const bucketName = 'dpost';

    // v3에서는 Command 객체를 생성해서 사용함
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });

    try {
      await this.s3.send(command);
      return {
        url: `https://api-minio.ldy-studio.com/${bucketName}/${encodeURIComponent(fileName)}`,
      };
    } catch (error) {
      console.error('이미지 업로드가 실패하였습니다.', error);
      throw error;
    }
  }

  async deleteFile(fileName: string) {
    const params = {
      Bucket: 'dpost',
      Key: fileName,
    };

    try {
      await this.s3.send(new DeleteObjectCommand(params));
      return { message: `${fileName} 파일이 삭제 되었습니다.` };
    } catch (error) {
      throw new Error(`${error.message} 파일 삭제를 실패하였습니다.`);
    }
  }
}
