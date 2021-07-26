import { UserResponse } from './responses/UserResponse';
//import { CommonAdapter } from './adapters/CommonAdapter';
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from 'routing-controllers';
//import { Users } from '../../domain/user';
import { RoomBookedDates } from './requests/roomBookedDates';
import { UserCreate } from './requests/UserCreate';
import { UserUpdate } from './requests/UserUpdate';
import { RoomService } from '../services/RoomService';
//import { CommonService } from '../services/CommonService';
import { UserService } from '../services/UserServices';
import { UserAdapter } from './adapters/UserAdapter';

@Controller('/v1/user')
export class UserController {
  @Get('')
  async getAllUsers(): Promise<UserResponse[]> {
    return (await UserService.getAllUsers()).map(user=>UserAdapter.convertUserIdToString(user));
  }

  @Get('/:id')
  async getOneUser(@Param('id') id: string): Promise<UserResponse> {
    return UserAdapter.convertUserIdToString(await UserService.getUserById(id));
  }

  @Post('')
  async addNewUser(@Body() user: UserCreate): Promise<UserResponse> {
    const newUser = UserAdapter.createRequestToUserEntity(user);
    return UserAdapter.convertUserIdToString(await UserService.addNewUser(newUser));
  }

  @Put('/:id')
  async editUserById(
    @Param('id') id: string,
    @Body() user: UserUpdate
  ): Promise<UserResponse | undefined> {
    return UserAdapter.convertUserIdToString(await UserService.editUserById(id, user));
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: string): Promise<UserResponse> {
    return UserAdapter.convertUserIdToString(await UserService.deleteUserById(id));
  }

  @Put('/:userId/room/:roomId')
  async assignRoom(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Body() roomBookedDDates: RoomBookedDates,
  ): Promise<UserResponse | undefined> {
    return UserAdapter.convertUserIdToString(await RoomService.bookRoom(userId, roomId, roomBookedDDates));
  }

  @Put('/:userId/unassign-room/:roomId')
  async unassignRoom(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Body() roomBookedDDates: RoomBookedDates,
    ): Promise<UserResponse | undefined> {
    return UserAdapter.convertUserIdToString(await RoomService.cancelBookedRoom(userId, roomId, roomBookedDDates));
  }
}
