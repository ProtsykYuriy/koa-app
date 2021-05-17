import { Between, getRepository, Repository } from 'typeorm';
import { Rooms } from '../entity/room';

export async function addNewRoom(room: Rooms): Promise<void> {
  try {
    const roomRepository = getRepository(Rooms);
    const newRoom = new Rooms();

    newRoom.roomNumber = room.roomNumber;
    newRoom.roomType = room.roomType;
    newRoom.price = room.price;
    newRoom.floor = room.floor;
    newRoom.windowFacesSea = room.windowFacesSea;
    newRoom.airConditioningSystem = room.airConditioningSystem;
    newRoom.facilities = {
      freeWiFi: room.facilities.freeWiFi,
      freeParking: room.facilities.freeParking,
      freeAdditionalBed: room.facilities.freeAdditionalBed,
      petsAllowed: room.facilities.petsAllowed,
      freeCarWash: room.facilities.freeCarWash,
    };
    await roomRepository.save(newRoom);
  } catch (err) {
    console.log(err);
  }
}

export async function getRoomsPriceFiltered(
  minPrice: number = 0,
  maxPrice: number = 10000
): Promise<Array<Rooms> | undefined> {
  try {
    const repository: Repository<Rooms> = getRepository(Rooms);
    return await repository.find({
      where: {
        'price': {$lt: maxPrice, $gt: minPrice}
      }
    });
  } catch (err) {
    console.log(err);
  }
}
