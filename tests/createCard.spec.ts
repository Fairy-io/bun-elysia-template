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

describe('POST /cards (test)', () => {
    let app: ReturnType<typeof createApp>;
    let CardsProvider: CardsProviderMock;

    beforeAll(() => {
        CardsProvider = new CardsProviderMock();

        app = createApp({ CardsProvider });
    });

    afterEach(() => {
        CardsProvider.create.mockReset();
    });

    it('returns created card', async () => {
        const cardDto = {
            name: 'Name',
            power: 10,
            description: 'Description',
        };

        const card = {
            id: '123',
            name: 'Name',
            power: 10,
            description: 'Description',
            created_at: '2024-12-28T10:59:23.489Z',
            updated_at: '2024-12-28T10:59:23.489Z',
        };

        CardsProvider.create.mockReturnValue(
            createCard(card),
        );

        const { response, status } = await app
            .handle(
                new Request('http://localhost/cards', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cardDto),
                }),
            )
            .then(async (res) => ({
                response: await res.json(),
                status: res.status,
            }));

        expect(response).toEqual(card);
        expect(status).toEqual(201);

        expect(CardsProvider.create).toHaveBeenCalledWith(
            cardDto,
        );
    });

    it('does not return validation error if description is not provided', async () => {
        const cardDto = {
            name: 'Name',
            power: 10,
        };

        const card = {
            id: '123',
            name: 'Name',
            power: 10,
            created_at: '2024-12-28T10:59:23.489Z',
            updated_at: '2024-12-28T10:59:23.489Z',
        };

        CardsProvider.create.mockReturnValue(
            createCard(card),
        );

        const { response, status } = await app
            .handle(
                new Request('http://localhost/cards', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cardDto),
                }),
            )
            .then(async (res) => ({
                response: await res.json(),
                status: res.status,
            }));

        expect(response.error).toBeUndefined();
        expect(status).not.toBe(400);
    });

});
