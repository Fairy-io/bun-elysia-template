import { t } from 'elysia';

export const CardDto = t.Object({
    name: t.String(),
    power: t.Numeric(),
    description: t.Optional(t.String()),
});
