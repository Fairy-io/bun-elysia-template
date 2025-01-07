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

describe('POST /cards', () => {
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
                        'user-role': 'admin',
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

    it('returns validation error if name is not provided', async () => {
        const cardDto = {
            power: 10,
            description: 'Description',
        };

        const { response, status } = await app
            .handle(
                new Request('http://localhost/cards', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'user-role': 'admin',
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
                new Request('http://localhost/cards', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'user-role': 'admin',
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
                new Request('http://localhost/cards', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'user-role': 'admin',
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
                new Request('http://localhost/cards', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'user-role': 'admin',
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

    it('returns unauthorized error if user role is not provided', async () => {
        const cardDto = {
            name: 'Name',
            power: 10,
            description: 'Description',
        };

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

        expect(response).toEqual({
            error: true,
            code: 'INSUFFICIENT_PRIVILEGES',
        });

        expect(status).toEqual(401);
    });

    it('returns unauthorized error if user role is not admin', async () => {
        const cardDto = {
            name: 'Name',
            power: 10,
            description: 'Description',
        };

        const { response, status } = await app
            .handle(
                new Request('http://localhost/cards', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'user-role': 'user',
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
            code: 'INSUFFICIENT_PRIVILEGES',
        });

        expect(status).toEqual(401);
    });
});
