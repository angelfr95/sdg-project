import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalsService } from '../../services/globals.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  formFilter!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _globals: GlobalsService
  ) {}

  ngOnInit(): void {
    this.loadFormMenu();
    this.formFilter.get('poblation')!.valueChanges.subscribe(value => {
      this._globals.poblationFilter = value;
    });
  }

  loadFormMenu() {
    this.formFilter = this._fb.group({
      poblation: [{ value: null, disabled: false }],
    });
  }

}
