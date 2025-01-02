import {
    afterEach,
    beforeAll,
    describe,
    expect,
    it,
} from 'bun:test';
import { createApp } from '../src/createApp';
import { CardsProviderMock } from './mocks/cards.provider';

describe('DELETE /cards/:id (test)', () => {
    let app: ReturnType<typeof createApp>;
    let CardsProvider: CardsProviderMock;

    beforeAll(() => {
        CardsProvider = new CardsProviderMock();

        app = createApp({ CardsProvider });
    });

    afterEach(() => {
        CardsProvider.delete.mockReset();
    });

    it('returns No Content response', async () => {
        const { response, status } = await app
            .handle(
                new Request('http://localhost/cards/123', {
                    method: 'delete',
                }),
            )
            .then(async (res) => ({
                response: await res.text(),
                status: res.status,
            }));

        expect(response).toBe('No Content');
        expect(status).toBe(204);

        expect(CardsProvider.delete).toHaveBeenCalledWith(
            '123',
        );
    });
});
