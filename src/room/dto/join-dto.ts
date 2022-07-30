import { UserRole } from '../room.model';

export class JoinRoomDto {
  public readonly nickname: string;
  public readonly role: UserRole;
}
