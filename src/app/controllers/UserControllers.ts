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
import { Rooms } from '../../domain/room';
import { UserCreate } from './requests/UserCreate';
import { UserUpdate } from './requests/UserUpdate';
import { UserService } from '../services/UserService';
import { CommonService } from '../services/CommonService';

@Controller('/v1/user')
export class UserController {
  @Get('')
  async getAllUsers(): Promise<(Users | Rooms)[] | undefined> {
    return await CommonService.getWholeCollection(Users);
  }

  @Get('/:id')
  async getOneUser(@Param('id') id: string): Promise<any> {
    return await CommonService.getById(id, Users);
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
    await CommonService.editById(id, user, Users);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: string): Promise<void> {
    await CommonService.deleteById(id, Users);
  }

  @Put('/:userId/room/:roomId')
  async assignRoom(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string
  ): Promise<void> {
    await UserService.assignRoomToUser(userId, roomId);
  }

  @Put('/:userId/room')
  async unassignRoom(@Param('userId') userId: string): Promise<void> {
    await UserService.unassignRoomFromUser(userId);
  }
}
