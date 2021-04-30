import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
    export class Room{
        @PrimaryGeneratedColumn ()
        _id: number;

        @Column ()
        roomNumber: number;

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