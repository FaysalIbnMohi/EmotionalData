import axios from "axios";
import { API_URL } from "./settings";
import { auth } from "./auth";
import _ from "lodash";

class ResponseError extends Error {
	constructor(message, data) {
		super(message);
		this.name = "";
		this.data = data;
	}
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response, getResponseHeaders = false) {
	if (response.status === 200) {
		if (getResponseHeaders) return [response.data, response.headers];
		else return response.data;
	} else {
		throw new ResponseError(
			response.data.message
				? response.data.message
				: "Something went wrong.",
			response.data
		);
	}
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function handleError(response) {
	const error = response;
	throw new ResponseError("", {
		status: error,
		message: "apiErrorMessage",
	});
}
/**
 * Format query params
 *
 * @param params
 * @returns {string}
 */

const customRequest = axios.create({
	baseURL: API_URL,
	validateStatus: function (status) {
		return !!(
			(status >= 200 && status < 300) ||
			status === 422 ||
			status === 500 ||
			400
		);
	},
});

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default async function request(
	url,
	requestConfig = {},
	getResponseHeaders = false
) {
	const token = await auth.getToken();
	const headers = {
		"Content-Type": "application/json",
		Accept: "application/json",
		// "Access-Control-Allow-Origin": "*",
		// "Access-Control-Allow-Credentials": true,
		"X-Frame-Options": "SAMEORIGIN",
		"X-Content-Type-Options": "nosniff",
		"Referrer-Policy": "strict-origin-when-cross-origin",
		"Permissions-Policy": "geolocation=*",
		"Content-Security-Policy": `default-src 'self' 'unsafe-inline' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data:; object-src 'self'; base-uri 'self'; connect-src 'self' ${API_URL}`,
	};
	if (token) {
		headers["token"] = token;
	}

	requestConfig.headers = _.omitBy(
		{
			...requestConfig.headers,
			...headers,
		},
		_.isNil
	);

	return customRequest(url, requestConfig)
		.then((response) => parseJSON(response, getResponseHeaders))
		.catch(handleError);
}
