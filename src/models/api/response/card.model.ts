import { t } from 'elysia';

export const CardModel = t.Object({
    id: t.String(),
    name: t.String(),
    power: t.Numeric(),
    description: t.Optional(t.String()),
    created_at: t.Date({
        examples: [new Date('2024-12-27T19:11:07.875Z')],
    }),
    updated_at: t.Date({
        examples: [new Date('2024-12-27T19:11:07.875Z')],
    }),
});
