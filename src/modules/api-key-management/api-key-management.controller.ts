import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiKeyManagementService } from './api-key-management.service';
import { CreateApiKeyDTO } from './dto/create-apiKey.dto';
import { UpdateApiKey } from './dto/update-apiKey.dto';

@Controller('api-key-management')
export class ApiKeyManagementController {

    constructor(private readonly service: ApiKeyManagementService) { }

    @Get('generate')
    generateApiKey() {
        return this.service.generateApiKey()
    }

    @Get('getApiList')
    getApiList() {
        return this.service.getApiList()
    }

    @Post()
    createApiKey(@Body() payload: CreateApiKeyDTO) {
        return this.service.createApiKey(payload)
    }

    @Patch()
    updateApiInfo(@Query('id') id: string, @Body() payload: UpdateApiKey) {
        return this.service.updateApiKey(id, payload)
    }

    @Delete()
    deleteApiKey(@Query('id') id: string) {
        return this.service.deleteApiKey(id)
    }
}
