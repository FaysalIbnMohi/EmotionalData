import { Grid } from "react-loader-spinner";

export default function Loader() {
	return (
		<div
			// style={{ position: "relative" }}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "rgba(0, 0, 0, 0.7)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 99999, // Ensure the loader is on top of other content
			}}
		>
			<Grid
				visible={true}
				height="80"
				width="80"
				color="#006A4E"
				ariaLabel="grid-loading"
				radius="12.5"
				wrapperStyle={
					{
						// position: "absolute",
						// height: "100vh",
						// width: "100vw",
						// justifyContent: "center",
						// alignItems: "center",
						// background: "#f5f3ea",
					}
				}
				wrapperClass="grid-wrapper"
			/>
		</div>
	);
}
