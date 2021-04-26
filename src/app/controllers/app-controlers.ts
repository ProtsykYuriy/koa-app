import { usersMongo } from './../bootstraps/bootstrapKoaApp';
import { UserModel } from './../../database/users/users.model';
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
import { RoomConfig } from '../requests/appRequests';
import { Cursor } from 'mongodb';
import { isFirebasePushId } from 'class-validator';

@Controller('/v1')
export class RoomController {

  @Get('/:id')
  async getOne(@Param('id') id: number, @QueryParam('name') name: string) {

    const cursor = usersMongo.find();
    const users: any[] = await cursor.toArray();
    //await cursor.forEach(doc => users.push(doc));
    console.log('-----', JSON.stringify(users));
    //return Object.assign(new UserModel(), users);
    return users;

    // const users =UserModel.find((err, usersReceived)=>{
    //   if (err) throw err;
    //   console.log( usersReceived)
    //   return usersReceived;
    // })


    // const users = await new Promise(resolve => resolve(
    //   UserModel.find((err, usersReceived)=>{
    //       if (err) throw err;
    //       return usersReceived;
    //     })
    // ))


    //return users;

    //return { id: id, name: name || 'test' };
  }

  @Post('')
  async post(@Body() room: RoomConfig) {
    // const user = new UserModel({
    //   name: room.name,
    // });

    try {
      //await user.save();
      await usersMongo.insertOne(room)

    } catch (err) {
      console.log(err);
    }
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
