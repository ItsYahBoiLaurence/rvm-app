import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { TestEndpointsService } from './test-endpoints.service';
import { TestDataDTO } from './dto/test-create-data.dto';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';
import * as fs from 'fs';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('test')
@UseFilters(ValidationExceptionFilter)
export class TestEndpointsController {
  constructor(private readonly service: TestEndpointsService) {}

  @Post('data')
  async testDataStructure(@Body() data: TestDataDTO) {
    return this.service.validateDataStructure(data);
  }

  @Post('fileUpload')
  @UseInterceptors(FileInterceptor('file'))
  async fileUploadEndpoint(@UploadedFile() file: Express.Multer.File) {
    const uploadDir = path.join(process.cwd(), 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.originalname);

    fs.writeFileSync(filePath, file.buffer);

    return {
      status: 'ok',
      fileName: file.originalname,
      savedTo: filePath,
    };
  }
}
