import { t } from 'elysia';
import { TypeCompiler } from '@sinclair/typebox/compiler';

type Schema = ReturnType<typeof t.Object>;

export const validateObject = <T extends Schema>(
    obj: { [key: string]: any },
    schema: T,
): T['static'] => {
    const validate = TypeCompiler.Compile(schema as any);

    const error = validate.Errors(obj).First();

    if (error) {
        const { path, message } = error;

        throw new Error(
            `Properties are not valid: ${path}, ${message}`,
        );
    }

    return obj;
};
