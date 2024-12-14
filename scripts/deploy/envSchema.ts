import { t } from 'elysia';

export const envSchema = t.Object({
    _IMAGE_NAME: t.String(),
    _IMAGE_TAG: t.String(),
    _DEPLOY_NAME: t.String(),
    _DEPLOY_INFRA_REPO_OWNER: t.String(),
    _DEPLOY_INFRA_REPO: t.String(),
    _DEPLOY_PATH: t.String(),
    _DEPLOY_TEMPLATE: t.String(),
    BRANCH_NAME: t.String(),
    GITHUB_TOKEN: t.String(),
});
