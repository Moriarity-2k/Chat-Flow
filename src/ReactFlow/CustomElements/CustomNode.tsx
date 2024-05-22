import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Handle, Position } from "reactflow";

/**
 * A custom ReactFlow node component representing a message node.
 *
 * @prop {string} id - Unique identifier for the node.
 * @prop {object} data - Node data containing:
 *   - `label: number` - The message content (number for this example).
 *   - `setSettingOpen: () => void` - to toggle the settings and create node.
 *   - `setId: (id: string) => void` - Function to set the node's ID to change the label when user click this node.
 */
export default function CustomNode(props: {
	id: string;
	data: {
		label: string;
		setSettingOpen: () => void;
		setId: (id: string) => void;
	};
}) {
	console.log(props.data.label);
	return (
		<div className="">
			<Handle type="source" position={Position.Left} id="top" />
			<Handle type="target" position={Position.Right} id="right" />
			{/* Custom Node */}
			<div
				onClick={() => {
					props.data.setSettingOpen();
					props.data.setId(props.id);
				}}
				className="w-[120px] max-sm:w-[50px] text-[8px] shadow-md"
			>
				<div className="text-black flex items-center justify-start gap-2 bg-[#b4e8f1] p-1">
					<IoChatbubbleEllipsesOutline className="" />
					<span className="font-bold">Send Message</span>
				</div>
				<div className="px-3 py-2 text-black">{props.data.label}</div>
			</div>
		</div>
	);
}
