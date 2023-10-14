import { Controller } from '@nestjs/common';
import { UsersService } from './services/users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
}
