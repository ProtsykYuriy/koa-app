import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
    export class User{
        @PrimaryGeneratedColumn ('uuid')
        _id: string;

        @Column ()
        name: string;

        // @Column ()
        // surname: string;

        // @Column ()
        // email: string;

        // @Column ()
        // phone: number;

        // @Column ()
        // roomNumber: number;

        // @Column ()
        // roomType: string;

        // @Column ()
        // price: number;

        // @Column ()
        // facilities: {
        //     freeWiFi: boolean,
        //     freeParking: boolean,
        //     freeAdditionalBed: boolean,
        //     petsAllowed: boolean,
        //     freeCarWash: boolean,
        // };
    }