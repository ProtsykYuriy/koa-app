import { users } from '../database/database';
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
import { Cursor } from 'mongodb';
import { isFirebasePushId } from 'class-validator';
import {getManager, getRepository} from "typeorm";
import { User } from '../entity/user';
//import {User} from "../entity/User";

@Controller('/v1')
export class RoomController {
  @Get('/:id')
  async getOne(@Param('id') id: number, @QueryParam('name') name: string) {
      return getManager().find(User);
    // const cursor = users.find();
    // const usersReceived: any[] = await cursor.toArray();
    // console.log('-----', JSON.stringify(usersReceived));
    // return usersReceived;
  }

  @Post('')
  async post(@Body() room: any) {
    try {
      const userRepository = getRepository(User);
      const newUser = new User();
      newUser.name = 'Aizek';
      //newUser.phone = '555';                                                                                                                                                                                                                                                                      )
      await userRepository.save(newUser);
      // await users.insertOne(room);
    } catch (err) {
      console.log(err);
    }
    return room;
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() room: any) {
    return `Slot #${id} name changed to ${room.name} Edited!`;
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return `Slot # ${id} Deleted!`;
  }
}
