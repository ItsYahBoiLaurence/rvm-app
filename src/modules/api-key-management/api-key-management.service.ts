import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApiKeyDTO } from './dto/create-apiKey.dto';
import { format } from 'date-fns';
import { UpdateApiKey } from './dto/update-apiKey.dto';
import { UpdateRVMDTO } from './dto/update-rvm.dto';


@Injectable()
export class ApiKeyManagementService {

    constructor(private readonly prisma: PrismaService) { }

    async generateApiKey() {
        return { apiKey: randomBytes(32).toString('hex') }
    }

    async getApiList() {
        const apiList = await this.prisma.apiKey.findMany({
            include: {
                rvmList: true
            }
        })
        if (!apiList) throw new NotFoundException('No available api!')
        return apiList
    }

    async createApiKey(payload: CreateApiKeyDTO) {

        const newApiKey = await this.prisma.apiKey.create({
            data: {
                apiKey: payload.apiKey,
                name: payload.name,
                description: payload.description,
                companyOwner: payload.companyOwner,
                role: payload.role
            }
        })

        if (!newApiKey) throw new ConflictException("Error Creating new apiKey!")

        return { success: true, message: "Creation Successful" }

    }

    async updateApiKey(id: string, payload: UpdateApiKey) {

        const apiKey = await this.prisma.apiKey.findFirst({
            where: {
                id
            }
        })
        if (!apiKey) throw new NotFoundException("ApiKey Id not found!")

        const updateApiKey = await this.prisma.apiKey.update({
            where: {
                id: apiKey.id
            },
            data: { ...payload }
        })

        if (!updateApiKey) throw new ConflictException("Error Updating ApiKey details!")

        return { success: true, message: "Update Successful" }
    }

    async deleteApiKey(id: string) {
        const apiKey = await this.prisma.apiKey.findFirst({
            where: {
                id
            }
        })

        if (!apiKey) throw new NotFoundException("ApiKey not Found")

        const deleteApi = await this.prisma.apiKey.delete({
            where: {
                id: apiKey.id
            }
        })

        if (!deleteApi) throw new ConflictException("Error deleting ApiKey")

        return { success: true, message: "Deleted successfully!" }
    }

    async addRvmToApi(id: string, data: UpdateRVMDTO) {

        const apiKey = await this.prisma.apiKey.findFirst({
            where: {
                id: data.apiKeyId
            }
        })

        if (!apiKey) throw new ConflictException("Invalid API Key")

        const updateRvm = await this.prisma.rVM.update({
            where: {
                id
            },
            data: {
                apiKeyId: apiKey.id
            }
        })

        if (!updateRvm) throw new ConflictException("Error including API to RVM")

        return { success: true, message: "Update Success!" }
    }
}