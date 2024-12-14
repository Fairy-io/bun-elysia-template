import { createHash } from 'crypto';
import yaml from 'yaml';
import { validateObject } from '../../src/utils/validateObject';
import { envSchema } from './envSchema';
import { Github } from './Github';

const getFileExtension = (
    content: string,
): 'json' | 'yaml' | 'txt' => {
    try {
        JSON.parse(content);

        return 'json';
    } catch (error) {
        try {
            yaml.parse(content);

            return 'yaml';
        } catch (error) {
            return 'txt';
        }
    }
};

const deploy = async () => {
    const {
        _DEPLOY_TEMPLATE,
        _IMAGE_NAME,
        _IMAGE_TAG,
        _DEPLOY_NAME,
        _DEPLOY_INFRA_REPO_OWNER,
        _DEPLOY_INFRA_REPO,
        _DEPLOY_PATH,
        BRANCH_NAME,
        GITHUB_TOKEN,
    } = validateObject(process.env, envSchema);

    const image = `${_IMAGE_NAME}:${_IMAGE_TAG}`;

    const deployment = Buffer.from(
        _DEPLOY_TEMPLATE,
        'base64',
    )
        .toString()
        .replace(/\$name/g, _DEPLOY_NAME)
        .replace(/\$image/g, image)
        .replace(/\$branch/g, BRANCH_NAME);

    const filenameId = createHash('sha256')
        .update(BRANCH_NAME)
        .digest('hex');

    const fileExtension = getFileExtension(deployment);

    const deployPath = `${_DEPLOY_PATH}/${filenameId}_${_DEPLOY_NAME}.${fileExtension}`;

    const github = new Github(GITHUB_TOKEN);

    await github.writeFile(
        _DEPLOY_INFRA_REPO_OWNER,
        _DEPLOY_INFRA_REPO,
        deployPath,
        deployment,
        image,
    );
};

deploy();
