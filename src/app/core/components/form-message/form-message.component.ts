import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyValidators } from './../../validators/validators.class';

@Component({
  selector: 'form-message',
  templateUrl: './form-message.component.html',
  styleUrls: ['./form-message.component.css']
})
export class FormMessageComponent implements OnInit {

	@Input('form') form : FormGroup;

	constructor() { }

	ngOnInit() {

	}

	get message() : string{
		for(let property in this.form.errors){
			if(this.form.touched && this.form.errors.hasOwnProperty(property)){
				return MyValidators.showError(property,this.form.errors[property]);
			}
		}
	}

}
