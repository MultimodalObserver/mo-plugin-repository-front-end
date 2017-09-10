import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'buildRepoUrl'})
export class BuildRepoUrlPipe implements PipeTransform {
  transform(value: any): string {

    return 'https://www.' + value.repo_type + '.com/' + value.repo_user + '/' + value.repo_name;
  }
}
