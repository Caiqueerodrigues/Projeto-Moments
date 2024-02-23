import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from '../../interfaces/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrl: './moment-form.component.css'
})
export class MomentFormComponent {
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!: string

  momentForm!:FormGroup; //tipo é o validador do form

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    })
  };

  get title() {
    return this.momentForm.get('title')!;
  }
  get description() {
    return this.momentForm.get('description')!;
  }
  get image() {
    return this.momentForm.get('image')!;
  }

  onFileSelected(ev: any) {
    const file: File = ev.target.files[0];

    this.momentForm.patchValue({image: file});
  }

  submit() {
    if(this.momentForm.invalid) return;
    this.onSubmit.emit(this.momentForm.value)
  };
};
