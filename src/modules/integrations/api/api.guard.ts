import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'

@Injectable()
export class ApiGuard implements CanActivate {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const apiKey = request.headers['x-api-key']

        if (!apiKey) throw new UnauthorizedException("Missing API key!")

        const validApiKey = await this.prisma.apiKey.findFirst({
            where: {
                apiKey
            },
            include: {
                rvmList: true
            }
        })

        if (!validApiKey) throw new UnauthorizedException("Invalid API key!")

        if (!validApiKey.isActive) throw new UnauthorizedException("API key not active!")

        request.user = validApiKey

        return true
    }
}