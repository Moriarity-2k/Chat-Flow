import { Node, useNodesState } from "reactflow";
import ReactFlowRender from "./ReactFlowRendert";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useState } from "react";

export default function ReactFlowMainComponent({
	openSetting,
	setSettingOpen,
}: {
	openSetting: boolean;
	setSettingOpen: () => void;
}) {
	const [nodes, setNodes] = useNodesState<Node[]>([]);
	const [customId, setCustomId] = useState<string>("");
	const [value, setValue] = useState<string>("");

	const CreateNodeHandler = (
		clientX: number | null,
		clientY: number | null
	) => {
		setNodes((prev: Node[]) => {
			const id = prev.length > 0 ? +prev[prev.length - 1].id + 1 : 1;
			const xVal =
				clientX != null && clientX > 0
					? clientX
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
							setSettingOpen();
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
					type: "nameChanger",
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
						<div className="text-center py-2 border-b border-gray-600">
							{" "}
							Message{" "}
						</div>
						<div className="w-full mt-4 pl-6">
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
								className="bg-inherit border border-gray-500 max-w-full px-2 font-sm font-light "
							/>
						</div>
					</div>
				) : (
					<button
						onClick={() => {
							console.log("clicked");
							CreateNodeHandler(null, null);
						}}
						className="text-blue-800 bg-white flex flex-col gap-2 px-16 py-4 items-center border border-blue-800 rounded-sm font-bold h-max ml-3 mt-3 w-max ring-0 active:ring-0 active:ring-offset-0 ring-offset-0 uppercase outline-non e focus:ring-0 focus-within:outline-none"
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
						<IoChatbubbleEllipsesOutline className="font-medium text-xl" />
						<div>Message</div>
					</button>
				)}
			</div>
		</div>
	);
}

/**
 * 
 * {/* <button
				onClick={() => {
					setNodes((prev) => {
						console.log(prev);
						const id =
							prev.length > 0 ? +prev[prev.length - 1].id + 1 : 1;
						return [
							...prev,
							{
								id: `${id}`,
								data: {
									label: Math.random() * 30000,
									deleteNode: () => {
										setNodes((x) =>
											x.filter(
												(obj) => obj.id !== `${id}`
											)
										);
									},
								},
								position: {
									x: prev.length > 0 ? (id - 1) * 100 : 0,
									y: 0,
								},
								type: "nameChanger",
							},
						];
					});
				}}
				className="tracking-wider bg-[#023db385] rounded-md font-semibold leading-tight p-3 hover:bg-blue-700 ring-0 ring-offset-0 text-white uppercase border-none outline-none"
			>
				Create Node
			</button> 
 */
