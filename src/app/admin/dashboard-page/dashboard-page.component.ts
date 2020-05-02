import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/servises/auth.service';
import { PostService } from 'src/app/shared/components/post.service';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  pSub: Subscription;

  constructor(private auth: AuthService, private postService: PostService) { }
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.getPosts();
  }


  getPosts() {
    this.pSub = this.postService.getPosts().subscribe(post => {
      this.posts = post;
    });
  }

  remove(post) {

  }

}
