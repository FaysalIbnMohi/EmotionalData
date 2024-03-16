import { jwtDecode } from "jwt-decode";
import {
	API_URL,
	VENDOR_ID,
	VENDOR_PASSWORD,
	VENDOR_PIN,
	VENDOR_USERNAME,
} from "./settings";

export const auth = {
	setToken(token, remember = false) {
		if (remember) {
			localStorage.setItem("user_token", token);
		} else {
			sessionStorage.setItem("user_token", token);
		}
	},
	setUserData(data) {
		localStorage.setItem("user_data", JSON.stringify(data));
	},
	async getToken() {
		let token = "";
		if (localStorage.getItem("user_token")) {
			token = localStorage.getItem("user_token");
		} else if (sessionStorage.getItem("user_token")) {
			token = sessionStorage.getItem("user_token");
		}
		if (token) {
			const { exp } = jwtDecode(token);
			if (Date.now() >= exp * 1000) {
				const response = await fetchToken();
				this.setToken(response?.token);
				return response?.token;
			}
			return token;
		} else {
			const response = await fetchToken();
			this.setToken(response?.token);
			return response?.token;
		}
	},
	logout() {
		window.localStorage.setItem("CREDENTIALS_FLUSH", Date.now().toString());
		window.localStorage.removeItem("CREDENTIALS_FLUSH");
		localStorage.removeItem("user_token");
		sessionStorage.removeItem("user_token");
		localStorage.removeItem("user_data");
		sessionStorage.removeItem("user_data");
		localStorage.clear();
		sessionStorage.clear();
	},
	async getDecodedTokenData() {
		const token = await this.getToken();
		if (token) {
			try {
				return jwtDecode(token);
			} catch {
				return null;
			}
		}
		return null;
	},
	getUserData() {
		try {
			const userData = localStorage.getItem("user_data");
			return JSON.parse(userData);
		} catch {
			return null;
		}
	},
	async getAgentId() {
		const token = await this.getToken();
		if (token) {
			try {
				const userData = localStorage.getItem("user_data");
				const parsedData = JSON.parse(userData);
				return parsedData?.login_id;
			} catch {
				return null;
			}
		}
		return null;
	},
};

async function fetchToken() {
	// Default options are marked with *
	const data = {
		vendor_id: VENDOR_ID,
		username: VENDOR_USERNAME,
		password: VENDOR_PASSWORD,
		pin: VENDOR_PIN,
	};
	const url = API_URL + `authenticate`;
	const response = await fetch(url, {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
}
