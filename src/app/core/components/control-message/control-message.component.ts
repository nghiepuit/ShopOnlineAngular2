import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MyValidators } from './../../validators/validators.class';

@Component({
  selector: 'control-message',
  templateUrl: './control-message.component.html',
  styleUrls: ['./control-message.component.css']
})
export class ControlMessageComponent implements OnInit {

	@Input('control') control : FormControl;

	constructor() { }

	ngOnInit() {

	}

	get message() : string{
		for(let property in this.control.errors){
			if(this.control.touched && this.control.errors.hasOwnProperty(property)){
				return MyValidators.showError(property,this.control.errors[property]);
			}
		}
	}

}
