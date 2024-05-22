import { Node, useNodesState } from "reactflow";
import ReactFlowRender from "./ReactFlowRendert";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useState } from "react";

/**
 * React component managing the main ReactFlow instance and its interaction with the settings panel.
 *
 * @prop {boolean} openSetting - Flag indicating if the settings panel is open.
 * @prop {function} setSettingOpen - Function to toggle the open state of the settings panel.
 */
export default function ReactFlowMainComponent({
	openSetting,
	setSettingOpen,
}: {
	openSetting: boolean;
	setSettingOpen: (open: boolean) => void;
}) {
	const [nodes, setNodes] = useNodesState<Node[]>([]);
	const [customId, setCustomId] = useState<string>("");
	const [value, setValue] = useState<string>("");

	/**
	 * Handles the creation of a new node in the ReactFlow instance.
	 * To change the position of the nodes based on drag events
	 * @param {number | null} clientX - X-coordinate of the click event (if any).
	 * @param {number | null} clientY - Y-coordinate of the click event (if any).
	 */
	const CreateNodeHandler = (
		clientX: number | null,
		clientY: number | null
	) => {
		setNodes((prev: Node[]) => {
			// dynamically caluating the id note: can just be a normal random number i.e., Math.random()*1000
			const id = prev.length > 0 ? +prev[prev.length - 1].id + 1 : 1;

			// Calculate initial position based on click or previous nodes
			const xVal =
				clientX != null && clientX > 0
					? clientX * 0.6
					: prev.length > 0
					? prev[prev.length - 1].position.x + 200
					: 0;
			const yVal = clientY !== null && clientY > 0 ? clientY - 150 : 0;

			return [
				...prev,
				{
					id: `${id}`,
					data: {
						label: "text-message-1",
						setSettingOpen: () => {
							setSettingOpen(true);
						},
						setId: (nodeId: string) => {
							console.log(nodeId, id);
							setCustomId(nodeId);
						},
					},
					position: {
						x: xVal,
						y: yVal,
					},
					type: "nameChanger", // custom Node type
				},
			];
		});
	};

	return (
		<div className="flex h-[calc(100vh-72px)] text-black">
			<ReactFlowRender
				nodes={nodes}
				setNodes={setNodes}
				createNodeHandler={CreateNodeHandler}
			/>
			{/* </div> */}
			<div className="w-[20%] box-border border border-gray-200 flex flex-col">
				{openSetting ? (
					<div className="">
						<div className="text-center sm:py-2 border-b border-gray-600">
							Message
						</div>
						<div className="w-full mt-4 md:pl-6">
							<input
								value={value}
								onChange={(e) => {
									const newValue = e.target.value;
									setValue(newValue);
									setNodes((prevNodes) =>
										prevNodes.map((node) => {
											if (node.id === customId) {
												return {
													...node,
													data: {
														...node.data,
														label: newValue,
													},
												};
											}
											return node;
										})
									);
								}}
								className="bg-inherit border border-gray-500 max-w-full sm:px-2 font-sm font-light "
							/>
						</div>
					</div>
				) : (
					<button
						onClick={() => {
							console.log("clicked");
							CreateNodeHandler(null, null);
						}}
						className="text-blue-800 bg-white flex flex-col gap-2 md:px-16 md:py-4 items-center border border-blue-800 rounded-sm sm:font-bold h-max sm:ml-3 mt-3 w-max ring-0 active:ring-0 active:ring-offset-0 ring-offset-0 uppercase max-sm:text-xs outline-none focus:ring-0 focus-within:outline-none"
						draggable={true}
						onDrag={(e) => e.preventDefault()}
						onDragStart={(e) => {
							if (
								e != null &&
								e.dataTransfer != null &&
								e.dataTransfer.effectAllowed != null
							) {
								e.dataTransfer.effectAllowed = "move";
							}
							e.dataTransfer.setData("text/plain", "HELLo");
						}}
					>
						<IoChatbubbleEllipsesOutline className="font-medium max-sm:text-xs" />
						<div className="text-[8px]">Message</div>
					</button>
				)}
			</div>
		</div>
	);
}
