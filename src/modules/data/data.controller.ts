import { Body, Controller, Get, Logger, Post, UseFilters } from '@nestjs/common';
import { DataService } from './data.service';
import { DataDTO } from './dto/create-data.dto';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';

@Controller('data')
@UseFilters(ValidationExceptionFilter)
export class DataController {

    constructor(private readonly service: DataService) { }

    @Get('getAll')
    getAllData() {
        return this.service.getAllData()
    }

    @Post()
    userDataApi(@Body() data: DataDTO) {
        console.log(data)
        return this.service.userRecycleData(data)
    }
}
