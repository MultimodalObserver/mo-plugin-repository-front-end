import { PublishComponent } from './publish.component';

function testParseGithubUserRepo(url: string, username: string = null, repo: string = null): boolean{

  let comp:PublishComponent = new PublishComponent(null);
  let result = comp.parseGithubUserRepo(url);

  if(result == null && username == null && repo == null) return true;

  if(result.username !== username) return false;
  if(result.repo !== repo) return false;

  return true;
}


describe('Publish component', () => {
  it('gets username and repository from url', () => {
    expect(testParseGithubUserRepo("https://www.github.com/felovilches/RePo", "felovilches", "repo")).toEqual(true);
    expect(testParseGithubUserRepo("  https://www.github.com/felovilches/RePo   ", "felovilches", "repo")).toEqual(true);
    expect(testParseGithubUserRepo("http://www.github.com/felovilches/RePo", "felovilches", "repo")).toEqual(true);
    expect(testParseGithubUserRepo("https://www.github.com/34/67", "34", "67")).toEqual(true);
    expect(testParseGithubUserRepo("  http://wWW.githuB.com/--34_/67?", "--34_", "67")).toEqual(true);
    expect(testParseGithubUserRepo("  http://githuB.com/--34_/67?", "--34_", "67")).toEqual(true);
    expect(testParseGithubUserRepo("  http://wWW.githuB.com/--34_/67/", "--34_", "67")).toEqual(true);
    expect(testParseGithubUserRepo("  http://githuB.com/--34_/67/", "--34_", "67")).toEqual(true);
  });

  it('gets username and repository from url even if the path has more sublinks (e.g. /aa/bb/cc)', () => {
    expect(testParseGithubUserRepo("https://www.github.com/felovilches/RePo/", "felovilches", "repo")).toEqual(true);
    expect(testParseGithubUserRepo("  https://www.github.com/felovilches/RePo/aaa   ", "felovilches", "repo")).toEqual(true);
    expect(testParseGithubUserRepo("http://www.github.com/felovilches/RePo/aaa/bbb", "felovilches", "repo")).toEqual(true);
    expect(testParseGithubUserRepo("https://www.github.com/34/67/aa", "34", "67")).toEqual(true);
    expect(testParseGithubUserRepo("  http://wWW.githuB.com/--34_/67/afg?", "--34_", "67")).toEqual(true);
    expect(testParseGithubUserRepo("  http://githuB.com/--34_/67/asd/?", "--34_", "67")).toEqual(true);
    expect(testParseGithubUserRepo("  http://wWW.githuB.com/--34_/67/sdsd/sds/", "--34_", "67")).toEqual(true);
    expect(testParseGithubUserRepo("  http://githuB.com/--34_/67/fds/dfs/dfs/", "--34_", "67")).toEqual(true);
  });
  
});
