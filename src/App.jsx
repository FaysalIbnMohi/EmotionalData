import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./modules/Auth";
import { Survey } from "./modules/Survey";

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<Auth />} path="/" />
				<Route element={<Survey />} path="/survey" />
			</Routes>
		</Router>
	);
}

export default App;
