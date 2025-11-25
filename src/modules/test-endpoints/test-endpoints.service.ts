import { Injectable } from '@nestjs/common';
import { TestDataDTO } from './dto/test-create-data.dto';

@Injectable()
export class TestEndpointsService {
    async validateDataStructure(data: TestDataDTO){
        return {message: "success", code: 0, data}
    }
}
