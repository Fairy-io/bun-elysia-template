import { CardDto } from '../models/api/dto';
import { Card } from '../models/api/response';

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

    async create(dto: CardDto): Promise<Card> {
        return {
            ...dto,
            id: '456',
            created_at: new Date(),
            updated_at: new Date(),
        };
    }

    async update(id: string, dto: CardDto): Promise<Card> {
        return {
            ...card,
            ...dto,
            id,
        };
    }
}
