import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileService {
  private readonly allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf'];
  private readonly allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB
  private readonly logger = new Logger(FileService.name);

  // Validate file type and size
  validateFile(file: Express.Multer.File) {
    const ext = extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype;

    if (!this.allowedExtensions.includes(ext) || !this.allowedMimeTypes.includes(mimeType)) {
      this.logger.warn(`Invalid file type: ${file.originalname} (${mimeType})`);
      throw new BadRequestException('Invalid file type');
    }

    if (file.size > this.maxFileSize) {
      this.logger.warn(`File too large: ${file.originalname} (${file.size} bytes)`);
      throw new BadRequestException('File size exceeds 5MB limit');
    }
  }

  // Process the file after validation (store, get metadata, etc.)
  processUpload(file: Express.Multer.File, folder: string) {
    return {
      filename: file.filename,
      path: `/uploads/${folder}/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype,
      uploadDate: new Date().toISOString(),
    };
  }
}
