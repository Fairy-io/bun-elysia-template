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

describe('GET /card/:id', () => {
    let app: ReturnType<typeof createApp>;
    let CardsProvider: CardsProviderMock;

    beforeAll(() => {
        CardsProvider = new CardsProviderMock();

        app = createApp({ CardsProvider });
    });

    afterEach(() => {
        CardsProvider.getById.mockReset();
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

        CardsProvider.getById.mockReturnValue(
            createCard(card),
        );

        const { response, status } = await app
            .handle(
                new Request('http://localhost/cards/123', {
                    method: 'get',
                }),
            )
            .then(async (res) => ({
                response: await res.json(),
                status: res.status,
            }));

        expect(response).toEqual(card);
        expect(status).toBe(200);

        expect(CardsProvider.getById).toHaveBeenCalledWith(
            '123',
        );
    });

    it('returns error if card does not exists', async () => {
        CardsProvider.getById.mockReturnValue(null);

        const { response, status } = await app
            .handle(
                new Request('http://localhost/cards/123', {
                    method: 'get',
                }),
            )
            .then(async (res) => ({
                response: await res.json(),
                status: res.status,
            }));

        expect(response).toEqual({
            error: true,
            code: 'NOT_FOUND',
            details: {
                id: '123',
                type: 'card',
            },
        });

        expect(status).toBe(404);

        expect(CardsProvider.getById).toHaveBeenCalledWith(
            '123',
        );
    });
});
