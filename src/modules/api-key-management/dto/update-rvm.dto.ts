import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateRVMDTO {
    @IsString({ message: "APIKey is required" })
    apiKeyId: string
}