import { IUpdateObject } from './../interfaces/interfaces';
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from 'routing-controllers';
import { Users } from '../entity/user';
import { Rooms } from '../entity/room';
import { deleteById, editById, getById, getWholeCollection } from '../methods/commonMethods';
import { addNewUser, assignRoomToUser, unassignRoomFromUser } from '../methods/userMethods';

@Controller('/v1/user')
export class UserController {
  @Get('')
  async getAllUsers(): Promise<(Users | Rooms)[] | undefined> {
    return await getWholeCollection (Users);
  }

  @Get('/:id')
  async getOneUser(@Param('id') id: string): Promise<any> {
    return await getById (id, Users);
  }

  @Post('')
  async addNewUser(@Body() user: any): Promise<void> {
    await addNewUser(user);
  }

  @Put('/:id')
  async editUserById(@Param('id') id: string, @Body() user: IUpdateObject): Promise<void> {
    await editById (id, user, Users);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: string): Promise<void> {
    await deleteById(id, Users);
  }

  @Put('/:userId/room/:roomId')
  async assignRoom(@Param('userId') userId: string, @Param('roomId') roomId: string): Promise<void> {
    await assignRoomToUser(userId, roomId);
  }

  @Put('/:userId/room')
  async unassignRoom(@Param('userId') userId: string): Promise<void> {
    await unassignRoomFromUser(userId);
  }
}
