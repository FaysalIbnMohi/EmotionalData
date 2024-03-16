export const API_URL = import.meta.env.VITE_API_URL;

export const firebase = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_authDomain,
	projectId: import.meta.env.VITE_FIREBASE_projectId,
	storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
	messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
	appId: import.meta.env.VITE_FIREBASE_appId
};

export const MODAL_BODY_TYPES = {
	CHECK_DEVICE_ELIGIBILITY: "CHECK_DEVICE_ELIGIBILITY",
	CONFIRMATION: "CONFIRMATION",
	THANK_YOU_FOR_ORDER: 'THANK_YOU_FOR_ORDER',
	SURVEY_FORM: 'SURVEY_FORM',
	DEFAULT: "",
};

export const MESSAGE_TYPE = {
	ERROR: "error",
	SUCCESS: "success",
};

export const QUESTIONS = [
	{
		question: "My thoughts were focused on an external task or activity",
		value: "Task"
	},
	{
		question: "My thoughts involved future events",
		value: "Future"
	},
	{
		question: "My thoughts involved past events",
		value: "Past"
	},
	{
		question: "My thoughts involved myself",
		value: "Self"
	},
	{
		question: "My thoughts involved other people",
		value: "People"
	},
	{
		question: "The emotion of my thoughts was positive (0 = negative)",
		value: "Emotion"
	},
	{
		question: "My thoughts were linked to information from the external environment/surroundings",
		value: "External"
	},
	{
		question: "My thoughts involved images",
		value: "Images"
	},
	{
		question: "My thoughts involved words",
		value: "Words"
	},
	{
		question: "My thoughts involved sounds",
		value: "Sounds"
	},
	{
		question: "My thoughts were detailed and specific",
		value: "Detailed"
	},
	{
		question: "My thoughts were deliberate (0 = spontaneous)",
		value: "Deliberate"
	},
	{
		question: "I was thinking about solutions to problems (or goals)",
		value: "Solutions"
	},
	{
		question: "My thoughts were intrusive",
		value: "Intrusive"
	},
	{
		question: "My thoughts contained information I already knew (e.g., knowledge or memories)",
		value: "Knowledge"
	},
	{
		question: "I was absorbed in the contents of my thoughts",
		value: "Absorption"
	},
	{
		question: "My thoughts were distracting me from what I am doing",
		value: "Distracting"
	},
	{
		question: "My thoughts were meaningful (0 = shallow)",
		value: "Meaningful"
	}
];
