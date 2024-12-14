import GithubApi from 'github-api';

export class Github {
    private api: GithubApi;

    constructor(token: string) {
        this.api = new GithubApi({ token });
    }

    writeFile(
        repositoryOwner: string,
        repositoryName: string,
        deploymentPath: string,
        deployment: string,
        image: string,
    ): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                this.api
                    .getRepo(
                        repositoryOwner,
                        repositoryName,
                    )
                    .writeFile(
                        'main',
                        deploymentPath,
                        deployment,
                        `deploying image ${image} for ${deploymentPath}`,
                        {},
                        async (error) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve();
                            }
                        },
                    );
            } catch (error) {
                reject(error);
            }
        });
    }
}
