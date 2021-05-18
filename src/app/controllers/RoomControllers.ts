import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  QueryParam,
} from 'routing-controllers';
import { Users } from '../../domain/user';
import { Rooms } from '../../domain/room';
import { RoomCreate } from './requests/RoomCreate';
import { RoomUpdate } from './requests/RoomUpdate';
import { CommonService } from '../services/CommonService';
import { RoomService } from '../services/RoomService';
import { CommonAdapter } from './adapters/CommonAdapter';

@Controller('/v1/room')
export class RoomController {
  @Get('')
  async getAllRooms(
    @QueryParam('minPrice') minPrice: number,
    @QueryParam('maxPrice') maxPrice: number
  ): Promise<(Users | Rooms)[] | undefined> {
    if (minPrice || maxPrice) {
      return await RoomService.getRoomsPriceFiltered(minPrice, maxPrice);
    }
    return await CommonService.getWholeCollection(Rooms);
  }

  @Get('/:id')
  async getOneRoom(@Param('id') id: string): Promise<any> {
    return await CommonService.getById(id, Rooms);
  }

  @Post('')
  async addNewUser(@Body() room: RoomCreate): Promise<void> {
    const newUser = CommonAdapter.createRequestToEntity(room);
    await CommonService.addNewItem(newUser, Rooms);
  }

  @Put('/:id')
  async editRoomById(
    @Param('id') id: string,
    @Body() room: RoomUpdate
  ): Promise<void> {
    await CommonService.editById(id, room, Rooms);
  }

  @Delete('/:id')
  async deleteRoomById(@Param('id') id: string): Promise<void> {
    await CommonService.deleteById(id, Rooms);
  }
}
