import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { readFileSync } from 'fs'

@Injectable()
export class AppService {
  S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.AWS_ENDPOINT
  });

  async uploadFile(file) {
    const { originalname } = file;

    await this.s3_upload(
      readFileSync(file.path),
      this.S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      // CreateBucketConfiguration: {
      //   LocationConstraint: 'EastJKT-a',
      // },
    };
    console.log(params);

    try {
      const s3Response = await this.s3.upload(params).promise();
      console.log(s3Response);
      return s3Response
    } catch (e) {
      console.log(e);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
