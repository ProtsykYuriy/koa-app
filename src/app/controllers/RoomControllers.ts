import { RoomResponse } from './responses/RoomResponse';
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
import { Rooms } from '../../domain/room';
import { RoomCreate } from './requests/RoomCreate';
import { RoomUpdate } from './requests/RoomUpdate';
import { CommonService } from '../services/CommonService';
import { RoomService } from '../services/RoomService';
import { CommonAdapter } from './adapters/CommonAdapter';

@Controller('/v1/room')
export class RoomControllers {
  @Get('')
  async getAllRooms(
    @QueryParam('minPrice') minPrice: number,
    @QueryParam('maxPrice') maxPrice: number
  ): Promise<RoomResponse[] | undefined> {
    if (minPrice || maxPrice) {
      return RoomService.filterRoomsByPrice(minPrice, maxPrice);
    }
    return CommonService.getAll(Rooms);
  }

  @Get('/:id')
  async getOneRoom(@Param('id') id: string): Promise<RoomResponse> {
    return CommonService.getById(id, Rooms);
  }

  @Post('')
  async addNewRoom(@Body() room: RoomCreate): Promise<RoomResponse> {
    const newRoom = CommonAdapter.createRequestToEntity(room);
    return CommonService.addNewItem(newRoom, Rooms);
  }

  @Put('/:id')
  async editRoomById(
    @Param('id') id: string,
    @Body() room: RoomUpdate
  ): Promise<RoomResponse | undefined> {
    return RoomService.editRoomById(id, room);
  }

  @Delete('/:id')
  async deleteRoomById(@Param('id') id: string): Promise<RoomResponse> {
    return CommonService.deleteById(id, Rooms);
  }
}
