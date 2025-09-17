import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiGuard } from './api.guard';
import { GetUser } from 'src/decorators/api.decorator';
import { ApiKeyUserType } from 'src/types/apiKey';


@Controller('api')
@UseGuards(ApiGuard)
export class ApiController {

    constructor(
        private readonly service: ApiService
    ) { }

    @Get()
    sayHello() {
        return this.service.sayHello()
    }

    @Get("get-all-data")
    getAlldata(@GetUser() user: ApiKeyUserType) {
        return this.service.getAllData(user)
    }

}
