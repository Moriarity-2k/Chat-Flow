import { useState } from "react";
import {
	BaseEdge,
	EdgeLabelRenderer,
	getBezierPath,
	useReactFlow,
} from "reactflow";

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
}) {
	const { setEdges } = useReactFlow();
	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});

	const onEdgeClick = () => {
		setEdges((edges) => edges.filter((edge) => edge.id !== id));
	};

	const [isHovering, setIsHovering] = useState(false);

	return (
		<>
			<BaseEdge
				path={edgePath}
				markerEnd={markerEnd}
				style={style}
			/>
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
