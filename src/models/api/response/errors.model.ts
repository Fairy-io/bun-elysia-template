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

export const InvalidPayloadModel = t.Object({
    error: t.Literal(true),
    code: t.Literal('INVALID_PAYLOAD', {
        examples: ['INVALID_PAYLOAD'],
    }),
    details: t.Object({
        fields: t.Array(
            t.Object({
                name: t.String(),
                code: t.Union([
                    t.Literal('NOT_PROVIDED'),
                    t.Literal('INVALID_STRING'),
                    t.Literal('INVALID_NUMBER'),
                ]),
            }),
        ),
    }),
});
