// V3.1.0- Guide post fixed & File upload Added

import { Injectable, BadRequestException } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileService {
  private readonly allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf'];

  validateFile(file: Express.Multer.File) {
    const ext = extname(file.originalname).toLowerCase();
    if (!this.allowedExtensions.includes(ext)) {
      throw new BadRequestException('Invalid file type');
    }
  }

  processUpload(file: Express.Multer.File, folder: string) {
    return {
      filename: file.filename,
      path: `/uploads/${folder}/${file.filename}`,
      size: file.size,
    };
  }
}
