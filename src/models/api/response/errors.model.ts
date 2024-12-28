import { t } from 'elysia';

export const NotFoundErrorModel = <T extends string>(
    type: T,
) =>
    t.Object({
        error: t.Literal(true),
        code: t.Literal('NOT_FOUND', {
            examples: ['NOT_FOUND'],
        }),
        details: t.Object({
            id: t.String(),
            type: t.Literal(type, { examples: [type] }),
        }),
    });
