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
import { RoomCreate } from './requests/RoomCreate';
import { RoomUpdate } from './requests/RoomUpdate';
import { RoomService } from '../services/RoomService';
import { RoomAdapter } from './adapters/RoomAdapter';

@Controller('/v1/room')
export class RoomController {
  @Get('')
  async getAllRooms(
    @Body() priceRange: any
  ): Promise<RoomResponse[] | undefined> {
    const rooms = await RoomService.getAllRooms(priceRange.minPrice, priceRange.maxPrice);
    return rooms.map(room=>RoomAdapter.convertRoomIdToString(room));
  }

  @Get('/:id')
  async getOneRoom(@Param('id') id: string): Promise<RoomResponse> {
    return RoomAdapter.convertRoomIdToString(await RoomService.getRoomById(id));
  }

  @Post('')
  async addNewRoom(@Body() room: RoomCreate): Promise<RoomResponse> {
    const newRoom = RoomAdapter.createRequestToRoomEntity(room);
    return RoomAdapter.convertRoomIdToString(await RoomService.addNewRoom(newRoom));
  }

  @Put('/:id')
  async editRoomById(
    @Param('id') id: string,
    @Body() room: RoomUpdate
  ): Promise<RoomResponse | undefined> {
    return RoomAdapter.convertRoomIdToString(await RoomService.editRoomById(id, room));
  }

  @Delete('/:id')
  async deleteRoomById(@Param('id') id: string): Promise<RoomResponse> {
    return RoomAdapter.convertRoomIdToString(await RoomService.deleteRoomById(id));
  }
}
