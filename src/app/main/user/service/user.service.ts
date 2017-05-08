import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { IUser } from './../defines/user.interface';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

	users: FirebaseListObservable<any[]>;
	user: FirebaseObjectObservable<any>;

	constructor(
		private db: AngularFireDatabase
	) {}

	getItems() {
		this.users = this.db.list('/users') as FirebaseListObservable<IUser[]>;
		return this.users;
	}

	getItem(id) {
		this.user = this.db.object('/users/' + id) as FirebaseObjectObservable<IUser>;
		return this.user;
	}

	addItem(user) {
		return this.users.push(user);
	}

	editItem(id, user) {
		return this.users.update(id, user);
	}

	deleteItem(id) {
		return this.users.remove(id);
	}

}