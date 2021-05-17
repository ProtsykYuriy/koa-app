import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { Rooms } from "./room";
@Entity()
    export class Users {
        @ObjectIdColumn()
        _id: ObjectID;

        @Column ()
        name: string;

        @Column ()
        surname: string;

        @Column ()
        email: string;

        @Column ()
        phone: string;

        @Column ()
        room: Rooms;
    }