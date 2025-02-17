import {
  GeneralGithubQuery,
  GitHubRepositoriesApiReponse,
  ListContributorsResponse,
  ListOrganizationRepositoriesInput,
} from "./types";

import { Service } from "typedi";
import axios from "axios";

@Service()
export class GithubService {
  private apiURL = "https://api.github.com";

  public listContributors = async ({
    owner,
    repo,
    path,
  }: GeneralGithubQuery) => {
    const response = await axios.get<ListContributorsResponse>(
      `${this.apiURL}/repos/${owner}/${repo}/commits?path=${path}`,
      // eslint-disable-next-line camelcase
      { params: { state: "all", per_page: 10 } },
    );
    const contributors = response.data.map(
      // eslint-disable-next-line camelcase
      ({ committer: { login, avatar_url, html_url, type, id } }) => ({
        id,
        login,
        avatar_url, // eslint-disable-line camelcase
        html_url, // eslint-disable-line camelcase
        type,
      }),
    );
    return contributors;
  };

  public listOrganizationRepositories = async ({
    org,
  }: ListOrganizationRepositoriesInput) => {
    const response = await axios.get<GitHubRepositoriesApiReponse>(
      `https://api.github.com/orgs/${org}/repos`,
    );
    return response.data;
  };
}
