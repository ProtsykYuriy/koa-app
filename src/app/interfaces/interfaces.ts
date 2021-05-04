import { ObjectID } from "typeorm";

export interface IUpdateObject {
    _id?: ObjectID,
    name?: string,
    surname?: string,
    email?: string,
    phone?: string,
    room?:{
        roomNumber?: string,
        roomType?: string,
        price?: number,
        floor?: number,
        windowFacesSea?: boolean,
        airConditioningSystem?: boolean,
        facilities?: {
            freeWiFi?: boolean,
            freeParking?: boolean,
            freeAdditionalBed?: boolean,
            petsAllowed?: boolean,
            freeCarWash?: boolean,
        };
    };
};