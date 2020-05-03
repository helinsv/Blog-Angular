import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from 'src/app/shared/components/post.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  post: Post;
  form: FormGroup
  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        author: new FormControl(post.author, Validators.required),
        text: new FormControl(post.text, Validators.required),
      })
    })

  }




}
