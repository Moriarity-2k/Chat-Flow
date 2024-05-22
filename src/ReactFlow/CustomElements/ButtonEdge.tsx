import { useState } from "react";
import {
	BaseEdge,
	EdgeLabelRenderer,
	EdgeProps,
	getBezierPath,
	useReactFlow,
} from "reactflow";

/**
 * CustomEdge component represents a custom edge in a React Flow diagram.
 * It provides the functionality to render and interact with edges, including edge remove button.
 *
 * @param {EdgeProps} props - The properties of the edge => default from reactFlow
 * @returns {JSX.Element} - return the custom edge edge.
 */
export default function CustomEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	markerEnd,
}: EdgeProps) {
	const { setEdges } = useReactFlow();
	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});

	/**
	 * Handles edge click event, removing the edge from the flow.
	 */
	const onEdgeClick = () => {
		setEdges((edges) => edges.filter((edge) => edge.id !== id));
	};

	const [isHovering, setIsHovering] = useState(false);

	return (
		<>
			<BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
			<EdgeLabelRenderer>
				<div
					style={{
						position: "absolute",
						transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						fontSize: 12,
						pointerEvents: "all",
					}}
					onMouseEnter={() => {
						setIsHovering(true);
					}}
					onMouseLeave={() => {
						setIsHovering(false);
					}}
					className="nodrag nopan edgeMain h-[20px] w-[20px]"
				>
					{isHovering && (
						<button
							className="edgebutton bg-red-300 w-[20px] h-[20px] rounded-full cursor-pointer text-[12px] leading-3"
							onClick={onEdgeClick}
						>
							×
						</button>
					)}
				</div>
			</EdgeLabelRenderer>
		</>
	);
}
