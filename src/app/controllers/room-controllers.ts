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
import { addNewRoom } from '../methods/roomMethods';

@Controller('/v1/room')
export class RoomController {
  @Get('')
  async getAllRooms(): Promise<(Users | Rooms)[] | undefined> {
    return await getWholeCollection(Rooms);
  }

  @Get('/:id')
  async getOneRoom(@Param('id') id: string): Promise<any> {
    return await getById (id, Rooms);
  }

  @Post('')
  async addNewRoom (@Body() room: any): Promise<void> {
    await addNewRoom(room);
  }

  @Put('/:id')
  async editRoomById(@Param('id') id: string, @Body() room: IUpdateObject): Promise<void> {
    await editById (id, room, Rooms);
  }

  @Delete('/:id')
  async deleteRoomById(@Param('id') id: string): Promise<void> {
    await deleteById (id, Rooms);
  }
}
