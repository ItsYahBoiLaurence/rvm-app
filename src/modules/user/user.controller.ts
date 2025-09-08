import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/types/user';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) { }

    @Get()
    greetingsFromData() {
        return this.service.greet()
    }

    @Post()
    userVerification(@Body() payload: User) {
        return this.service.verifyUser(payload)
    }

}
