import {
    afterEach,
    beforeAll,
    describe,
    expect,
    it,
} from 'bun:test';
import { createApp } from '../src/createApp';
import { CardsProviderMock } from './mocks/cards.provider';
import { createCard } from './helpers/createCard';

describe('GET /card/:id (test)', () => {
    let app: ReturnType<typeof createApp>;
    let CardsProvider: CardsProviderMock;

    beforeAll(() => {
        CardsProvider = new CardsProviderMock();

        app = createApp({ CardsProvider });
    });

    afterEach(() => {
        CardsProvider.fetchCards.mockReset();
    });

    it('returns card if exists', async () => {
        const card = {
            id: '123',
            name: 'Name',
            power: 5,
            description: 'Description',
            created_at: '2024-12-28T10:59:23.489Z',
            updated_at: '2024-12-28T10:59:23.489Z',
        };

        CardsProvider.getCardById.mockReturnValue(
            createCard(card),
        );

        const response = await app
            .handle(
                new Request('http://localhost/cards/123', {
                    method: 'get',
                }),
            )
            .then((res) => res.json());

        expect(response).toEqual(card);

        expect(
            CardsProvider.getCardById,
        ).toHaveBeenCalledWith('123');
    });
});
