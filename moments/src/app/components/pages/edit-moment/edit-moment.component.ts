import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Moment } from '../../../interfaces/Moment';
import { MomentService } from '../../../services/moment/moment.service';
import { MessagesService } from '../../../services/messages/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css'
})
export class EditMomentComponent {
  moment!: Moment;
  btnText: string = "Editar";

  constructor(
    private momentService: MomentService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessagesService,
  ) {};

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe(item => this.moment = item.data);
  }

  async editHandler(momentData: Moment) {
    const id = this.moment.id;
    const formDate = new FormData();

    formDate.append('title', momentData.title);
    formDate.append('description', momentData.description);

    if(momentData.image) formDate.append('image', momentData.image);

    await this.momentService.updateMoment(id!, formDate).subscribe();
    this.messageService.add(`Momento ${id} foi atualizado com sucesso`);
    this.router.navigate(['/']);
  }
}
