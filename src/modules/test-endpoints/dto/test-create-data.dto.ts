import { IsNotEmpty, IsString } from "class-validator";

export class TestDataDTO {

    @IsString({ message: "rvmID must be a string" })
    @IsNotEmpty({ message: "rvmID should not be empty" })
    rvmID: string

    @IsString({ message: "timestamp must be a string" })
    @IsNotEmpty({ message: "timestamp should not be empty" })
    timestamp: string

    @IsString({ message: "totalCount must be a string" })
    @IsNotEmpty({ message: "totalCount should not be empty" })
    totalCount: string

    @IsString({ message: "totalValue must be a string" })
    @IsNotEmpty({ message: "totalValue should not be empty" })
    totalValue: string

    @IsString({ message: "item must be a string" })
    @IsNotEmpty({ message: "item should not be empty" })
    item: string

    @IsString({ message: "messageID must be a string" })
    @IsNotEmpty({ message: "messageID should not be empty" })
    messageID: string

    @IsString({ message: "userID must be a string" })
    userID: string

    @IsString({ message: "sign must be a string" })
    @IsNotEmpty({ message: "sign should not be empty" })
    sign: string
}