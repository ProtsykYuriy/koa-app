import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from 'routing-controllers';
import { RoomConfig } from '../configs/appConfigs';

@Controller('/v1')
export class RoomController {

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return {id: id, name: 'test'};
  }

  @Post('')
  post(@Body() room: RoomConfig) {
    return room;
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() room: RoomConfig) {
    return `Slot #${id} name changed to ${room.name} Edited!`;
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return `Slot # ${id} Deleted!`;
  }
}
