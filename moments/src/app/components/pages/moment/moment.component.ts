import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MomentService } from '../../../services/moment/moment.service';
import { Moment } from '../../../interfaces/Moment';


@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})
export class MomentComponent {
  moment?: Moment;

  constructor(private momentService: MomentService, private route: ActivatedRoute) { };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService
      .getMoment(id)
      .subscribe(item => this.moment = item.data);
  }

}
