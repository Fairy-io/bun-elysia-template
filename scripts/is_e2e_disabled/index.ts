/**
 * the command which we want to use is as follows:
 * bun scripts/is_e2e_disabled/index.ts || bun test -t e2e
 *
 * This means if e2e tests are disabled (this is default),
 * then we have to return status 0
 *
 * If e2e tests are not disabled, then we have to return status,
 * so it will run e2e tests
 */

const { IS_E2E_DISABLED } = process.env;

if (IS_E2E_DISABLED === 'false') {
    console.log('Running e2e tests');

    process.exit(1);
} else {
    console.log('Skipping e2e tests');

    process.exit(0);
}
