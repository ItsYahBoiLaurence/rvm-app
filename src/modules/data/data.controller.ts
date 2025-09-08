import { Body, Controller, Get, Logger, Post, UseFilters } from '@nestjs/common';
import { DataService } from './data.service';
import { Data } from 'src/types/data';
import { DataDTO } from './dto/create-data.dto';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';

@Controller('data')
@UseFilters(ValidationExceptionFilter)
export class DataController {

    constructor(private readonly service: DataService) { }

    @Get()
    greetingsFromData() {
        return this.service.greet()
    }

    @Post()
    userDataApi(@Body() data: DataDTO) {
        console.log(data)
        return this.service.userRecycleData(data)
    }
}
