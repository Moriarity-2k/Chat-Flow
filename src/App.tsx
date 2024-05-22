import { useState } from "react";
import ReactFlowMainComponent from "./ReactFlow/ReactFlowMainComponent";

function App() {
	const [openSettings, setOpenSetting] = useState<boolean>(false);

	const setSettingOpen = () => setOpenSetting(true);

	return (
		<div className="h-screen w-screen bg-white font-mono">
			{/* Navbar */}
			<div className="h-[4.5rem] bg-gray-100 flex items-center justify-end">
				{openSettings && (
					<button
						onClick={() => setOpenSetting(false)}
						className="text-black float-right mr-20 font-semibold text-sm py-2 px-8 w-max border-blue-500 bg-white border-2 rounded-md hover:cursor-pointer"
					>
						Save Changes
					</button>
				)}
			</div>

			{/* Main component */}
			<ReactFlowMainComponent
				setSettingOpen={setSettingOpen}
				openSetting={openSettings}
			/>
		</div>
	);
}

export default App;
