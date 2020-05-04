import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Post } from '../../shared/interfaces'
import { PostService } from 'src/app/shared/components/post.service';
import { AlertService } from '../shared/servises/alert.service';
@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  constructor(private postService: PostService, private alertService: AlertService) { }

  form: FormGroup;

  ngOnInit() {

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      author: new FormControl('', [Validators.required, Validators.minLength(3)]),
      text: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }



  submit() {
    if (this.form.invalid) {
      return
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date()
    };

    this.postService.create(post).subscribe(() => {
      this.form.reset();
      this.alertService.success('Post added');
    }
    );
  }

}
