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

describe('PUT /cards/:id', () => {
    let app: ReturnType<typeof createApp>;
    let CardsProvider: CardsProviderMock;

    beforeAll(() => {
        CardsProvider = new CardsProviderMock();

        app = createApp({ CardsProvider });
    });

    afterEach(() => {
        CardsProvider.update.mockReset();
        CardsProvider.getById.mockReset();
    });

    it('returns updated card', async () => {
        const cardDto = {
            name: 'Updated Name',
            power: 20,
        };

        const card = {
            id: '123',
            name: 'Updated Name',
            power: 20,
            description: 'Description',
            created_at: '2024-12-28T10:59:23.489Z',
            updated_at: '2024-12-28T10:59:23.489Z',
        };

        CardsProvider.getById.mockReturnValue(
            createCard(card),
        );
        CardsProvider.update.mockReturnValue(
            createCard(card),
        );

        const { response, status } = await app
            .handle(
                new Request('http://localhost/cards/123', {
                    method: 'put',
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
        expect(status).toBe(200);

        expect(CardsProvider.update).toHaveBeenCalledWith(
            '123',
            cardDto,
        );
    });

    it('returns error if card does not exist', async () => {
        const cardDto = {
            name: 'Updated Name',
            power: 20,
            description: 'Updated Description',
        };

        CardsProvider.getById.mockReturnValue(null);

        const { response, status } = await app
            .handle(
                new Request('http://localhost/cards/456', {
                    method: 'put',
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

        expect(response).toEqual({
            error: true,
            code: 'NOT_FOUND',
            details: {
                id: '456',
                type: 'card',
            },
        });

        expect(status).toBe(404);

        expect(CardsProvider.getById).toHaveBeenCalledWith(
            '456',
        );

        expect(CardsProvider.update).not.toHaveBeenCalled();
    });

    it('returns validation error if name is not provided', async () => {
        const cardDto = {
            power: 10,
            description: 'Description',
        };

        const { response, status } = await app
            .handle(
                new Request('http://localhost/cards/123', {
                    method: 'put',
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

        expect(response).toEqual({
            error: true,
            code: 'INVALID_PAYLOAD',
            details: {
                fields: [
                    { name: 'name', code: 'NOT_PROVIDED' },
                ],
            },
        });

        expect(status).toEqual(400);
    });

    it('returns validation error if name is not a string', async () => {
        const cardDto = {
            name: 123,
            power: 10,
            description: 'Description',
        };

        const { response, status } = await app
            .handle(
                new Request('http://localhost/cards/123', {
                    method: 'put',
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

        expect(response).toEqual({
            error: true,
            code: 'INVALID_PAYLOAD',
            details: {
                fields: [
                    {
                        name: 'name',
                        code: 'INVALID_STRING',
                    },
                ],
            },
        });

        expect(status).toEqual(400);
    });

    it('returns validation error if power is not provided', async () => {
        const cardDto = {
            name: 'Name',
            description: 'Description',
        };

        const { response, status } = await app
            .handle(
                new Request('http://localhost/cards/123', {
                    method: 'put',
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

        expect(response).toEqual({
            error: true,
            code: 'INVALID_PAYLOAD',
            details: {
                fields: [
                    {
                        name: 'power',
                        code: 'NOT_PROVIDED',
                    },
                ],
            },
        });

        expect(status).toEqual(400);
    });

    it('returns validation error if power is not a number', async () => {
        const cardDto = {
            name: 'Name',
            power: 'power',
            description: 'Description',
        };

        const { response, status } = await app
            .handle(
                new Request('http://localhost/cards/123', {
                    method: 'put',
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

        expect(response).toEqual({
            error: true,
            code: 'INVALID_PAYLOAD',
            details: {
                fields: [
                    {
                        name: 'power',
                        code: 'INVALID_NUMBER',
                    },
                ],
            },
        });

        expect(status).toEqual(400);
    });
});
