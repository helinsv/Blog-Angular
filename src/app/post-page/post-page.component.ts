import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../shared/interfaces';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PostService } from '../shared/components/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post: Post;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return this.postService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post;
    });
  }

}
