import { t } from 'elysia';

export const CardDtoSchema = t.Object({
    name: t.String(),
    power: t.Numeric(),
    description: t.Optional(t.String()),
});

export type CardDto = typeof CardDtoSchema.static;
