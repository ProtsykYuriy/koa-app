import { getRepository, Repository } from "typeorm";
import { Rooms } from "../entity/room";
import { Users } from "../entity/user";
import { getById } from "./commonMethods";

export async function addNewUser (user){
    try {
        const userRepository = getRepository(Users);
        const newUser = new Users();
        newUser.name = user.name;
        newUser.surname = user.surname;
        newUser.email = user.email;
        newUser.phone = user.phone;
        return await userRepository.save(newUser);
    } catch (err) {
        console.log(err);
    }
}


export async function assignRoomToUser (userId: string, roomId: string): Promise<void>{
    try {
        const UserRepository: Repository<Users> = getRepository(Users);
        const room: Rooms = await getById(roomId, Rooms);
        const user: Users = await getById(userId, Users);
        user.room = room;
        await UserRepository.save(user);
    } catch (err) {
        console.log(err);
    }
}

export async function unassignRoomFromUser (userId: string): Promise<void>{
    try {
        const UserRepository: Repository<Users> = getRepository(Users);
        const user = await getById(userId, Users);
        user.room = null;
        await UserRepository.save(user);
    } catch (err) {
        console.log(err);
    }
}