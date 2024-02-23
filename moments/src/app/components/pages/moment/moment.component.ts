import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { MomentService } from '../../../services/moment/moment.service';
import { CommentService } from '../../../services/comment/comment.service';
import { Moment } from '../../../interfaces/Moment';
import { MessagesService } from '../../../services/messages/messages.service';
import { environment } from '../../environments/environment';
import { Comment } from '../../../interfaces/Comment';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})
export class MomentComponent {
  baseApiUrl = environment.baseApiUrl;
  moment?: Moment;

  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService, 
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ) { };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService
      .getMoment(id)
      .subscribe(item => this.moment = item.data);

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }
  
  get text() {
    return this.commentForm.get('text')!;
  }
  get username() {
    return this.commentForm.get('username')!;
  }

  async removeMoment(id: number) {
    await this.momentService.deleteMoment(id).subscribe();

    this.messageService.add("Momento Excluído com sucesso!");
    this.router.navigate(['/']);
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if(this.commentForm.invalid) return;

    const data: Comment = this.commentForm.value;
      data.momentId = Number(this.moment!.id);
      console.log(data);
      

    await this.commentService
      .createComment(data)
      .subscribe((comment) => this.moment!.comments!.push(comment.data))

      this.messageService.add(`Comentário Adcionado!`);

      //resetar o form
      this.commentForm.reset();
      formDirective.resetForm();
  }
}
