// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	firebase: {
		apiKey: "AIzaSyCd0KHT1aDX1KZyQKWu2w_IxBJZ2Jhv02w",
		authDomain: "skeleton-firebase-datatable.firebaseapp.com",
		databaseURL: "https://skeleton-firebase-datatable.firebaseio.com",
		projectId: "skeleton-firebase-datatable",
		storageBucket: "skeleton-firebase-datatable.appspot.com",
		messagingSenderId: "754812836688"
	}
};
