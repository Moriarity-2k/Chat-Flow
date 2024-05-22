import { useState } from "react";
import ReactFlowMainComponent from "./ReactFlow/ReactFlowMainComponent";
import Navbar from "./components/Navbar";

function App() {
	/**
	 * toggles the settings panel and create Node ( button / drag-drop ) panel
	 */
	const [openSettings, setOpenSetting] = useState<boolean>(false);

	/**
	 * Utility function to toggle panel's
	 * @param open : defined which panel should be displayed
	 */
	const setSettingOpen = (open: boolean) => setOpenSetting(open);

	return (
		<div className="h-screen w-screen bg-white font-mono">
			{/* Navbar */}
			<Navbar
				openSettings={openSettings}
				setOpenSetting={setOpenSetting}
			/>
			{/* Main component */}
			<ReactFlowMainComponent
				setSettingOpen={setSettingOpen}
				openSetting={openSettings}
			/>
		</div>
	);
}

export default App;
