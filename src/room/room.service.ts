import { Injectable } from '@nestjs/common';
import { JoinRoomDto } from './dto/join-dto';
import { User, UserRole } from './room.model';
import { v4 as uuidv4 } from 'uuid';
import { LeaveRoomDto } from './dto/leave-dto';

@Injectable()
export class RoomService {
  private meSessionId: string = uuidv4();
  private Rooms: User[] = [
    {
      sessionId: this.meSessionId,
      userId: uuidv4(),
      joinTime: Math.round(Date.now() / 1000),
      nickname: 'me',
      role: UserRole.Admin,
      status: {
        raisedHand: false,
      },
    },
  ];
  getRoleClient = (clients: User[], userRole: UserRole) => {
    return clients
      .filter((user) => user.role == userRole)
      .sort((a, b) => (a.joinTime > b.joinTime ? 1 : -1));
  };
  topClients = () => {
    const allClients = this.Rooms.filter(
      (user) => user.sessionId != this.meSessionId,
    );
    const topUsers = [
      ...this.getRoleClient(allClients, UserRole.Admin),
      ...this.getRoleClient(allClients, UserRole.Operator),
      ...this.getRoleClient(allClients, UserRole.Presenter),
      ...this.getRoleClient(allClients, UserRole.Member),
      ...this.getRoleClient(allClients, UserRole.Guest),
    ];
    return topUsers.slice(0, 100);
  };
  getUsers() {
    return {
      clients: this.topClients(),
      me: this.Rooms.find((user) => user.sessionId == this.meSessionId),
    };
  }
  join(joinRoomDto: JoinRoomDto) {
    const newUser: User = {
      sessionId: uuidv4(),
      userId: uuidv4(),
      joinTime: Math.round(Date.now() / 1000),
      nickname: joinRoomDto.nickname,
      role: joinRoomDto.role,
      status: {
        raisedHand: false,
      },
    };
    this.Rooms.push(newUser);
    return this.getUsers();
  }
  leave(leaveRoomDto: LeaveRoomDto) {
    this.Rooms = this.Rooms.filter(
      (user) => user.sessionId != leaveRoomDto.sessionId,
    );
    return { ok: true };
  }
}
