import { mock } from 'bun:test';
import { ConfigProviderInterface } from '../../src/providers';

export class ConfigProviderMock
    implements ConfigProviderInterface
{
    public getConfig = mock();
}
