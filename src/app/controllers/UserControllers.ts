import { UserResponse } from './responses/UserResponse';
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
import { RoomBookedDates } from './requests/RoomBookedDates';
import { UserCreate } from './requests/UserCreate';
import { UserUpdate } from './requests/UserUpdate';
import { RoomService } from '../services/RoomService';
import { CommonService } from '../services/CommonService';
import { UserService } from '../services/UserServices';

@Controller('/v1/user')
export class UserControllers {
  @Get('')
  async getAllUsers(): Promise<UserResponse[]> {
    return (await CommonService.getAll(Users)).map(item=>CommonAdapter.convertIdToString(item));
  }

  @Get('/:id')
  async getOneUser(@Param('id') id: string): Promise<UserResponse> {
    return CommonAdapter.convertIdToString(await CommonService.getById(id, Users));
  }

  @Post('')
  async addNewUser(@Body() user: UserCreate): Promise<UserResponse> {
    const newUser = CommonAdapter.createRequestToEntity(user);
    return CommonAdapter.convertIdToString(await CommonService.addNewItem(newUser, Users));
  }

  @Put('/:id')
  async editUserById(
    @Param('id') id: string,
    @Body() user: UserUpdate
  ): Promise<UserResponse | undefined> {
    return CommonAdapter.convertIdToString(await UserService.editUserById(id, user));
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: string): Promise<UserResponse> {
    return CommonAdapter.convertIdToString(await CommonService.deleteById(id, Users));
  }

  @Put('/:userId/room/:roomId')
  async assignRoom(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Body() roomBookedDDates: RoomBookedDates,
  ): Promise<UserResponse | undefined> {
    return CommonAdapter.convertIdToString(await RoomService.bookRoom(userId, roomId, roomBookedDDates));
  }

  @Put('/:userId/unassign-room/:roomId')
  async unassignRoom(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Body() roomBookedDDates: RoomBookedDates,
    ): Promise<UserResponse | undefined> {
    return CommonAdapter.convertIdToString(await RoomService.cancelBookedRoom(userId, roomId, roomBookedDDates));
  }
}
