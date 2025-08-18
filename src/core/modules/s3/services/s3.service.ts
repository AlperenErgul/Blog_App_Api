import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class S3Service {

    private readonly s3Client: S3Client;
    private readonly bucketName: string;
    private readonly cloudFrontDomain: string;

    constructor(private configService: ConfigService) {
        // Type guard fonksiyonu
        const getRequiredConfig = (key: string): string => {
            const value = this.configService.get<string>(key);
            if (!value) {
                throw new Error(`Missing required environment variable: ${key}`);
            }
            return value;
        };

        // Required config'leri al
        const awsRegion = getRequiredConfig('AWS_REGION');
        const awsAccessKey = getRequiredConfig('AWS_ACCESS_KEY_ID');
        const awsSecretKey = getRequiredConfig('AWS_SECRET_ACCESS_KEY');
        const bucketName = getRequiredConfig('S3_BUCKET_NAME');
        const cloudFrontDomain = getRequiredConfig('CLOUDFRONT_DOMAIN');

        this.s3Client = new S3Client({
            region: awsRegion,
            credentials: {
                accessKeyId: awsAccessKey,
                secretAccessKey: awsSecretKey,
            },
        });

        this.bucketName = bucketName;
        this.cloudFrontDomain = cloudFrontDomain;
    }

    async getUploadPresignedUrl(
        userId: string,
        fileType: string,
        fileSize?: number
    ): Promise<{ uploadUrl: string; key: string; viewUrl: string }>{
        // Dosya uzantısını belirler
        const extensions = this.getFileExtension(fileType);

        const key = `profiles/${userId}.${extensions}`;

        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            ContentType: fileType,
            ContentLength: fileSize,
            Metadata:{
                userId: userId,
                uploadedAt: new Date().toISOString()
            }
        });

        // 15 dk geçerli Pre-signed URL oluştur
        const uploadUrl = await getSignedUrl(this.s3Client, command, {
            expiresIn: 900
        });

        const viewUrl = `${this.cloudFrontDomain}/${key}`;

        return{
            uploadUrl,
            key,
            viewUrl
        }
    }

    async deleteFile(key: string): Promise<boolean> {
        try {
            const command = new DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            });

            await this.s3Client.send(command);
            return true;
        } catch (error) {
            console.error('S3 delete error:', error);
            return false;
        }
    }

    /**
     * CloudFront URL'i oluştur
     */
    getCloudFrontUrl(key: string): string {
        return `${this.cloudFrontDomain}/${key}`;
    }

    /**
     * File type'dan extension çıkar
     */
    private getFileExtension(fileType: string): string {
        const mimeMap = {
            'image/jpeg': 'jpg',
            'image/jpg': 'jpg',
            'image/png': 'png',
            'image/webp': 'webp',
            'image/gif': 'gif',
        };

        return mimeMap[fileType] || 'jpg';
    }

    /**
     * File type validation
     */
    isValidImageType(fileType: string): boolean {
        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp',
            'image/gif'
        ];

        return allowedTypes.includes(fileType);
    }

    /**
     * File size validation (5MB limit)
     */
    isValidFileSize(fileSize: number): boolean {
        const maxSize = 5 * 1024 * 1024; // 5MB
        return fileSize <= maxSize;
    }


}
