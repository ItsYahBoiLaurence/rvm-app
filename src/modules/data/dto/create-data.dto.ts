import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DataDTO {

    @IsString({ message: "rvmID must be a string" })
    @IsNotEmpty({ message: "rvmID should not be empty" })
    rvmID: string

    @IsString()
    timestamp: string

    @IsString()
    totalCount: string

    @IsString()
    totalValue: string

    @IsString()
    item: string

    @IsString()
    messageID: string

    @IsString()
    userID: string

    @IsString()
    sign: string
}