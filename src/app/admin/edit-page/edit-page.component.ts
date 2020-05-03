import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from 'src/app/shared/components/post.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  post: Post;
  form: FormGroup;
  submitted = false;
  uSub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        author: new FormControl(post.author, Validators.required),
        text: new FormControl(post.text, Validators.required),
      })
    })

  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true;
    this.uSub = this.postService.updatePost({
      id: this.post.id,
      title: this.form.value.title,
      text: this.form.value.text,
      date: new Date(),
      author: this.form.value.author
    }).subscribe(() => {
      this.submitted = false;
      this.router.navigate(['/admin', 'dashboard']);
    })


  }




}
