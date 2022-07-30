import { Body, Controller, Get, Post } from '@nestjs/common';
import { JoinRoomDto } from './dto/join-dto';
import { LeaveRoomDto } from './dto/leave-dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Get()
  getUsers() {
    return this.roomService.getUsers();
  }

  @Post('join')
  join(@Body() joinRoomDto: JoinRoomDto) {
    return this.roomService.join(joinRoomDto);
  }

  @Post('leave')
  leave(@Body() leaveRoomDto: LeaveRoomDto) {
    return this.roomService.leave(leaveRoomDto);
  }
}
