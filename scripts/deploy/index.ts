import { validateObject } from '../../src/utils/validateObject';
import { envSchema } from './envSchema';

const deploy = async () => {
    const envs = validateObject(process.env, envSchema);

    console.log(envs);
};

deploy();
