import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

	constructor() { }

	login(username: string, password: string) {

	}

	logout() {

	}

	isUserAuthenticated(): boolean {
		return false;
	}

	getLoggedInUser(): any {
		return null;
	}

}
