import { CardModel } from '../models/api/response';

type Card = typeof CardModel.static;

const card: Card = {
    id: '123',
    name: 'Name',
    power: 5,
    description: 'Description',
    created_at: new Date(),
    updated_at: new Date(),
};

export class CardsProvider {
    async fetchCards(): Promise<Card[]> {
        return [card];
    }

    async getCardById(id: string): Promise<Card | null> {
        if (id !== '123') {
            return null;
        }

        return card;
    }
}
