import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
@Entity()
    export class Rooms{
        @ObjectIdColumn()
        _id: ObjectID;

        @Column ()
        roomNumber: string;

        @Column ()
        roomType: string;

        @Column ()
        price: number;

        @Column ()
        floor: number;

        @Column ()
        windowFacesSea: boolean;

        @Column ()
        airConditioningSystem: boolean;

        @Column ()
        facilities: {
            freeWiFi: boolean,
            freeParking: boolean,
            freeAdditionalBed: boolean,
            petsAllowed: boolean,
            freeCarWash: boolean,
        };
    }