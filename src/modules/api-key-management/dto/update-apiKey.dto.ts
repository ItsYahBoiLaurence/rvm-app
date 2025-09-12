import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator"
import { Role } from "src/types/apiKey"

export class UpdateApiKey {

    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsBoolean()
    @IsOptional()
    isActive?: boolean

    @IsString()
    @IsOptional()
    companyOwner?: string

    @IsEnum(Role)
    @IsOptional()
    role?: Role
}