import { SetMetadata } from "@nestjs/common";
import { UserAuthorityEnum } from "src/users/entity/enum/user.authority.enum";

export const Roles = (...roles: UserAuthorityEnum[]): any => SetMetadata('roles', roles);