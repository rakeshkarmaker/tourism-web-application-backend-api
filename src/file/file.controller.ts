import { Controller, Post, UseInterceptors, Query, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Query('folder') folder: string, // 👈 Get folder from query parameter
    @UploadedFile() file: Express.Multer.File
  ) {
    const uploadFolder = folder || 'others';
    this.fileService.validateFile(file);
    return this.fileService.processUpload(file, uploadFolder);
  }
}


/*
Method: POST
URL: http://localhost:3000/file/upload
Body:
file (Type: File)
folder (Type: Text, Value: "profilePic" or "guidePic")
*/
// In this controller, we have a POST /file/upload route that accepts a file and a folder name. The file is uploaded using the FileInterceptor, which saves the file to the ./uploads folder. We then call the validateFile method to check if the file meets the requirements (e.g., file type, file size). If the file is valid, we call the processUpload method to process the file and return the result. We also log the file upload status using the Logger service.