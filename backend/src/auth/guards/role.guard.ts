import { Request } from 'express';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { User } from 'src/users/entity';
import { Role } from 'src/types/enum';

type RequestWithUser = Request & {
  user: User;
};

export const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      return user?.roles.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};
