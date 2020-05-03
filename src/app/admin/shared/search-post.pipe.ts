import { Pipe, PipeTransform } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';

@Pipe({
  pure: false,
  name: 'searchPost'
})
export class SearchPostPipe implements PipeTransform {

  transform(posts: Post[], search: string = ''): Post[] {
    if (!search.trim()) {
      return posts;
    } else
      return posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  }

}
