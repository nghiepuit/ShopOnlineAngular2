import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	editing = {};
	selected = [];
	rows = [
		{ id: 1, firstname: "Phan Phuoc", lastname: "Nghiep", gender: 'Male', address: "TPHCM", status: true },
		{ id: 2, firstname: "Ramsey", lastname: "Cummings", gender: 'Female', address: "Glendale", status: false },
		{ id: 3, firstname: "Mabel", lastname: "David", gender: 'Male', address: "Saranap", status: true },
		{ id: 4, firstname: "Santiago", lastname: "Mcclain", gender: 'Female', address: "Kenmar", status: true },
		{ id: 5, firstname: "Stefanie", lastname: "Huff", gender: 'Male', address: "Kipp", status: true },
		{ id: 6, firstname: "Phan Phuoc", lastname: "Nghiep", gender: 'Female', address: "TPHCM", status: true },
		{ id: 7, firstname: "Ramsey", lastname: "Cummings", gender: 'Male', address: "Glendale", status: false },
		{ id: 8, firstname: "Mabel", lastname: "David", gender: 'Female', address: "Saranap", status: true },
		{ id: 9, firstname: "Santiago", lastname: "Mcclain", gender: 'Male', address: "Kenmar", status: true },
		{ id: 10, firstname: "Stefanie", lastname: "Huff", gender: 'Female', address: "Kipp", status: true },
		{ id: 11, firstname: "Phan Phuoc", lastname: "Nghiep", gender: 'Male', address: "TPHCM", status: true },
		{ id: 12, firstname: "Ramsey", lastname: "Cummings", gender: 'Female', address: "Glendale", status: false }
	];

	// columns = [
	// 	{ name:'ID' , prop : 'id'},
	// 	{ name:'First Name', prop : 'firstname' },
	// 	{ name:'Last Name', prop : 'lastname' },
	// 	{ name:'Gender', prop : 'gender' },
	// 	{ name:'Address', prop : 'address' },
	// 	{ name:'Status', prop : 'status' },
	// ];

	constructor(
		private _userService: UserService,
		public flashMessage: FlashMessagesService
	) { }

	ngOnInit() {

	}

	updateValue(event, cell, cellValue, row) {
		this.editing[row.$$index + '-' + cell] = false;
		this.rows[row.$$index][cell] = event.target.value;
		// console.log('Old value : ' + cellValue);
		// console.log('New value : ' + event.target.value);
		// console.log(this.rows[row.$$index]);
		for (var i = 0; i < this.rows.length; i++) {
			if (this.rows[i].id == this.rows[row.$$index].id) {
				this.rows[i] = this.rows[row.$$index];
				break;
			}
		}
		console.log(this.rows);
	}

	createUser() {
		let newUser = {
			id: this.rows[this.rows.length - 1].id + 1,
			firstname: "Test" + this.rows[this.rows.length - 1].id + 1,
			lastname: "Test" + this.rows[this.rows.length - 1].id + 1,
			gender: 'Male',
			address: "Address" + this.rows[this.rows.length - 1].id + 1,
			status: true
		}
		for (var i = 0; i < 100; i++) {
			this.rows.push(newUser);
		}
	}

	deleteUser() {
		console.log(this.selected.length);
		if (this.selected.length > 0) {
			for (var i = 0; i < this.rows.length; i++) {
				for (var j = 0; j < this.selected.length; j++) {
					if (this.rows[i].id == this.selected[j].id) {
						this.rows.splice(i, 1);
						this.selected.splice(j, 1);
						i--;
						j--;
						break;
					}
				}
			}
		} else {
			this.flashMessage.show('Please choose user !', { cssClass: 'alert-warning', timeout: 3000 });
		}
	}

	onSelect({ selected }) {
		this.selected.splice(0, this.selected.length);
		this.selected.push(...selected);
	}

	onActivate(event) {

	}

}
