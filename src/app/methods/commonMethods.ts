import { IUpdateObject } from './../interfaces/interfaces';
import { ObjectId } from "mongodb";
import { EntityTarget, getRepository, Repository } from "typeorm";
import { Rooms } from "../entity/room";
import { Users } from "../entity/user";

export async function getById (id: string, collection: EntityTarget<Users|Rooms>): Promise<any> {
    try {
        const getObjectId: ObjectId = new ObjectId(id);
        const repository: Repository<Users|Rooms> = getRepository(collection);
        return await repository.findOne({_id: getObjectId});
    } catch (err) {
        console.log(err);
    }
}

export async function getWholeCollection (collection: EntityTarget<Users|Rooms>): Promise<Array<Users|Rooms>|undefined>{
    try {
        const repository: Repository<Users|Rooms> = getRepository(collection);
        return await repository.find();
    } catch (err) {
        console.log(err);
    }
}

export async function deleteById (id: string, collection: EntityTarget<Users|Rooms>): Promise<void>{
    try {
        const getObjectId: ObjectId = new ObjectId(id);
        const repository: Repository<Users|Rooms> = getRepository(collection);
        await repository.delete({_id: getObjectId});
    } catch (err) {
        console.log(err);
    }
}

export async function editById (id: string, body: IUpdateObject, collection: EntityTarget<Users|Rooms>): Promise<void>{
    try {
        console.log('----', id, body)
        const repository: Repository<Users|Rooms> = getRepository(collection);
        let element: Users|Rooms = await getById(id, collection);
        element = saveIncomeProperties(element, body);
        await repository.save(element);
    } catch (err) {
        console.log(err);
    }
}

function saveIncomeProperties (updatedElement: any, updateBody: IUpdateObject): Users|Rooms{
    const updateKeys: string[] = Object.keys(updateBody);
    updateKeys.forEach((property: string): void=>{
        if (typeof updateBody[property] === 'object' && Object.keys(updateBody[property]).length>0){
            const basicObject = updatedElement[property]? updatedElement[property] : {};
            updatedElement[property] = saveIncomeProperties (basicObject, updateBody[property]);
        } else {
            updatedElement[property] = updateBody[property]!==''? updateBody[property] : updatedElement[property];
        }
    })
    return updatedElement;
}