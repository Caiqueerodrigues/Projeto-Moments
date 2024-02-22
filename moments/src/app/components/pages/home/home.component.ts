import { Component } from '@angular/core';

import { MomentService } from '../../../services/moment/moment.service';
import { Moment } from '../../../interfaces/Moment';
import { environment } from '../../environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  basiApiUrl = environment.baseApiUrl;

  allMoments: Moment[] = [];
  moments: Moment[] = [];

  constructor(private momentService: MomentService) { };

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleString();
      })

      this.allMoments = data;
      this.moments = data;
    });
  }
}
