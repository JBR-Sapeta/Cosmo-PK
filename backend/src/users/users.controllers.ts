import { Controller } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
}
