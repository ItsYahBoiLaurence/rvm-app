import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { TestEndpointsService } from './test-endpoints.service';
import { TestDataDTO } from './dto/test-create-data.dto';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';

@Controller('test')
@UseFilters(ValidationExceptionFilter)
export class TestEndpointsController {

    constructor(private readonly service: TestEndpointsService){}

    @Post("data")
    async testDataStructure(@Body() data : TestDataDTO){
        return this.service.validateDataStructure(data)
    }
    
}
