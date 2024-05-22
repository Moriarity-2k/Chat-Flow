/**
 * A React component representing a navigation bar with a "Save Changes" button
 * that appears conditionally based on the `openSettings` prop.
 *
 * @prop {boolean} openSettings - Flag indicating if the settings panel is open.
 * @prop {function} setOpenSetting - Function to toggle the open state of the settings panel.
 */

interface INavbar {
	openSettings: boolean;
	setOpenSetting: (open: boolean) => void;
}
function Navbar({ openSettings, setOpenSetting }: INavbar) {
	return (
		<div className="h-[4.5rem] bg-gray-100 flex items-center justify-end">
			{openSettings ? (
				<button
					onClick={() => setOpenSetting(false)}
					className="text-black float-right md:mr-20 font-semibold text-sm md:py-2 md:px-8 w-max border-blue-500 bg-white border-2 rounded-md hover:cursor-pointer"
				>
					Save Changes
				</button>
			) : (
				<div
					onClick={() => setOpenSetting(false)}
					className="text-blue-950 capitalize float-right mr-20 font-semibold text-sm py-2 px-8 w-max rounded-md hover:cursor-pointer"
				>
					create new node by clicking on the message
				</div>
			)}
		</div>
	);
}

export default Navbar;
