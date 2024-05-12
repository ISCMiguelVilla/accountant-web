export interface SingUp {
	name:				string,
	username:			string,
	password:			string,
}

export interface SingIn {
	username:			string,
	password:			string,
}

export interface AuthResponse {
	token:				string,
}
