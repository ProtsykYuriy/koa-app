import { CommonAdapter } from './adapters/CommonAdapter';
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from 'routing-controllers';
import { Users } from '../../domain/user';
import { RoomBookedDates } from './requests/roomBookedDates';
import { UserCreate } from './requests/UserCreate';
import { UserUpdate } from './requests/UserUpdate';
import { RoomService } from '../services/RoomService';
import { CommonService } from '../services/CommonService';
import { UserService } from '../services/UserServices';

@Controller('/v1/user')
export class UserControllers {
  @Get('')
  async getAllUsers(): Promise<Users[]> {
    return CommonService.getAll(Users);
  }

  @Get('/:id')
  async getOneUser(@Param('id') id: string): Promise<Users> {
    return CommonService.getById(id, Users);
  }

  @Post('')
  async addNewUser(@Body() user: UserCreate): Promise<void> {
    const newUser = CommonAdapter.createRequestToEntity(user);
    await CommonService.addNewItem(newUser, Users);
  }

  @Put('/:id')
  async editUserById(
    @Param('id') id: string,
    @Body() user: UserUpdate
  ): Promise<void> {
    await UserService.editUserById(id, user);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: string): Promise<void> {
    await CommonService.deleteById(id, Users);
  }

  @Put('/:userId/room/:roomId')
  async assignRoom(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Body() roomBookedDDates: RoomBookedDates,
  ): Promise<void> {
    await RoomService.bookRoom(userId, roomId, roomBookedDDates);
  }

  @Put('/:userId/unassign-room/:roomId')
  async unassignRoom(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Body() roomBookedDDates: RoomBookedDates,
    ): Promise<void> {
    await RoomService.cancelBookedRoom(userId, roomId, roomBookedDDates);
  }
}
