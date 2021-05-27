import { Column, Entity } from "typeorm";
import { Rooms } from "./room";

@Entity()
export class BookedRoom {
  @Column()
  room: Rooms;

  @Column()
  moveInDate: Date;

  @Column()
  moveOutDate: Date;
}
