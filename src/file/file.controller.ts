//V3.1.0- Guide post fixed & File upload Added

import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body('folder') folder: string) {
    this.fileService.validateFile(file);
    return this.fileService.processUpload(file, folder);
  }
}


/*
Postman:
Method: POST
URL: http://localhost:3000/file/upload
Body:
file (Type: File)
folder (Type: Text, Value: "profilePic" or "guidePic")
*/