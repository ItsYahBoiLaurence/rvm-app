import { Injectable, Logger } from '@nestjs/common';
import { User, UserReturnPayload } from 'src/types/user';

@Injectable()
export class UserService {

    private logger = new Logger(UserService.name)

    async greet() {
        this.logger.log("Greetings from User Service")
        return "Greetings from User Service"
    }

    async verifyUser(payload: User): Promise<UserReturnPayload> {
        // if(!payload) return {
        //     co
        // }
        this.logger.log(payload)
        return {
            messageID: "",
            timestamp: " string",
            status: 1,
            code: 0
        }
    }
}
