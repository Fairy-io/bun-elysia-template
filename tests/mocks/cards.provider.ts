import { mock } from 'bun:test';

import { CardsProvider } from '../../src/providers';

export class CardsProviderMock implements CardsProvider {
    public fetchCards = mock();
    public getCardById = mock();
}
