import { Component } from '@angular/core';
import { Moment } from '../../../interfaces/Moment';
import { MomentService } from '../../../services/moment/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css'
})
export class NewMomentComponent {
  btnText: string = "Compartilhar!";

  constructor(private momentService: MomentService) { };

  async createHandler(moment: Moment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if(moment.image) formData.append('image', moment.image);

    this.momentService.createMoment(formData).subscribe();
  }
}
