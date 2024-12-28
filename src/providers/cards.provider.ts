import { CardModel } from '../models/api/response';

type Card = typeof CardModel.static;

export class CardsProvider {
    async fetchCards(): Promise<Card[]> {
        return [];
    }
}
