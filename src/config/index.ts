import { t } from 'elysia';
import { validateObject } from '../utils/validateObject';
import { parseIntObject } from '../utils/parseIntObject';

const configSchema = t.Object({
    PORT: t.Optional(t.Numeric()),
    DOCUMENTATION_TITLE: t.Optional(t.String()),
    DOCUMENTATION_VERSION: t.Optional(t.String()),
    DOCUMENTATION_DESCRIPTION: t.Optional(t.String()),
});

export const config = validateObject(
    parseIntObject(process.env),
    configSchema,
);
