import { mock } from 'bun:test';

import { CardsProvider } from '../../src/providers';

export class CardsProviderMock implements CardsProvider {
    public fetchAll = mock();
    public getById = mock();
    public create = mock();
    public update = mock();
}
