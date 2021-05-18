import { Rooms } from '../../domain/room';
import { getRepository, Repository } from 'typeorm';

export class RoomService {
  public static async getRoomsPriceFiltered(
    minPrice: number = 0,
    maxPrice: number = 10000
  ): Promise<Array<Rooms> | undefined> {
    try {
      const repository: Repository<Rooms> = getRepository(Rooms);
      return await repository.find({
        where: {
          price: { $lt: maxPrice, $gt: minPrice },
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
