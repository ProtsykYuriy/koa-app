import { ObjectId } from 'mongodb';

export class RoomResponse {
  _id: string;

  roomNumber: string;

  roomType: string;

  price: number;

  floor: number;

  windowFacesSea: boolean;

  airConditioningSystem: boolean;

  facilities: {

    freeWiFi: boolean;

    freeParking: boolean;

    freeAdditionalBed: boolean;

    petsAllowed: boolean;

    freeCarWash: boolean;
  };
}
