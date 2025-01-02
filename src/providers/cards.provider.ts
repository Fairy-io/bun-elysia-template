import { CardDto } from '../models/api/dto';
import { CardModel } from '../models/api/response';

type Card = typeof CardModel.static;
type Dto = typeof CardDto.static;

const card: Card = {
    id: '123',
    name: 'Name',
    power: 5,
    description: 'Description',
    created_at: new Date(),
    updated_at: new Date(),
};

export class CardsProvider {
    async fetchAll(): Promise<Card[]> {
        return [card];
    }

    async getById(id: string): Promise<Card | null> {
        if (id !== '123') {
            return null;
        }

        return card;
    }

    async create(dto: Dto): Promise<Card> {
        return {
            ...dto,
            id: '456',
            created_at: new Date(),
            updated_at: new Date(),
        };
    }
}
