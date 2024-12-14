import { t } from 'elysia';
import { validateObject } from '../utils/validateObject';
import { parseIntObject } from '../utils/parseIntObject';

const configSchema = t.Object({
    PORT: t.Optional(t.Numeric()),
});

export const config = validateObject(
    parseIntObject(process.env),
    configSchema,
);
