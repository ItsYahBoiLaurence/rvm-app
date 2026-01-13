import { Injectable } from '@nestjs/common';
import { TestDataDTO } from './dto/test-create-data.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TestEndpointsService {
  constructor(private readonly axios: HttpService) {}

  async validateDataStructure(data: TestDataDTO) {
    return { message: 'success', code: 0, data };
  }
}
