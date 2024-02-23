import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MomentService } from '../../../services/moment/moment.service';
import { Moment } from '../../../interfaces/Moment';
import { MessagesService } from '../../../services/messages/messages.service';
import { environment } from '../../environments/environment';

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

  constructor(
    private momentService: MomentService, 
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router,
  ) { };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService
      .getMoment(id)
      .subscribe(item => this.moment = item.data);
  }

  async removeMoment(id: number) {
    await this.momentService.deleteMoment(id).subscribe();

    this.messageService.add("Momento Excluído com sucesso!");
    this.router.navigate(['/']);
  }
}
