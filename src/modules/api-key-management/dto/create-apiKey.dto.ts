import { IsBoolean, IsEnum, IsString } from "class-validator";
import { Role } from "src/types/apiKey";

export class CreateApiKeyDTO {
    @IsString()
    apiKey: string

    @IsString()
    name: string

    @IsString()
    description: string

    @IsBoolean()
    isActive: boolean

    @IsString()
    companyOwner: string

    @IsEnum(Role)
    role: Role
}