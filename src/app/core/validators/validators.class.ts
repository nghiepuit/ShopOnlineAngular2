import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from './../services/user.service';
import { Subscription }   from 'rxjs/Subscription';
import { IUser } from './../defines/user.interface';

export class MyValidators{

	static emailValidators(formControl : FormControl){
		let value : string = ( formControl.value != null) ? formControl.value : '';
		let pattern : any = /[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/;
		if(value.length == 0 || value.match(pattern)){
			return null;
		}else{
			return { 'invalidEmail' : true };
		}
	}

	static showError(validatorType : string, validatorValue? : string) : string{
		let arrMessage : any = {
			'required' : 'Required',
			'minlength' : 'Minlength ' + validatorValue['requiredLength'] + ' character',
			'maxlength' : 'Maxlength ' + validatorValue['requiredLength'] + ' character',
			'invalidEmail' : 'Email invalid',
			'pattern' : 'Pattern: ' + validatorValue['requiredPattern'],
			'mismatchedPasswords' : 'Password not match'
		}
		return arrMessage[validatorType];
	}

	static matchingPasswords(passwordControlName : string, repasswordControlName : string){
		return (group : FormGroup) : { [key : string] : boolean } => {
			let passwordControl = group.controls[passwordControlName];
			let repasswordControl = group.controls[repasswordControlName];
			if(passwordControl.value !== repasswordControl.value)
				return { 'mismatchedPasswords' : true };
			return null;
		}
	}

}