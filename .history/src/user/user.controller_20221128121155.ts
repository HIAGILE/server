// cats.controller.ts / 예제1

import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('all')
    async findAll(): Promise<string> {
        return 'This action returns all cats';
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<string> {
        return 'This action returns one cats';
    }
}