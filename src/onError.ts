import Elysia from 'elysia';
import {
    InvalidPayload,
    InvalidPayloadFieldCode,
} from './models/api/response';

type CustomError = InvalidPayload;

export const onError = new Elysia().onError(
    { as: 'global' },
    ({ code, error, set }): CustomError | void => {
        if (code === 'VALIDATION') {
            set.status = 'Bad Request';

            const notProvidedProperties: string[] = [];

            return {
                error: true,
                code: 'INVALID_PAYLOAD',
                details: {
                    fields: error.all
                        .map((error) => {
                            // if summary is not defined, we should skip
                            if (
                                typeof error.summary ===
                                'undefined'
                            ) {
                                return null;
                            }

                            const { summary, path } = error;

                            /**
                             * if we have undefined / not provided field, then we are getting dupplicated errors like:
                             * - something is missing
                             * - something must be numeric or number
                             * - something must be a string, but got undefined
                             *
                             * so in this case, we don't care about other duplicated errors, because we know root cause - field is not provided
                             * we should skip
                             */
                            if (
                                summary.endsWith(
                                    'is missing',
                                )
                            ) {
                                notProvidedProperties.push(
                                    path,
                                );
                            } else if (
                                notProvidedProperties.includes(
                                    path,
                                )
                            ) {
                                return null;
                            }

                            // default code is 'NOT_PROVIDED'
                            let code: InvalidPayloadFieldCode =
                                'NOT_PROVIDED';

                            // we check summaries for determine what correct code should be
                            if (
                                summary.includes(
                                    'to be  string but found',
                                )
                            ) {
                                code = 'INVALID_STRING';
                            }

                            if (
                                summary.endsWith(
                                    "should be one of: 'numeric', 'number'",
                                )
                            ) {
                                code = 'INVALID_NUMBER';
                            }

                            // we construct correct detail
                            return {
                                code,
                                name: path.slice(1),
                            };
                        })
                        .filter((field) => field !== null),
                },
            };
        }
    },
);
