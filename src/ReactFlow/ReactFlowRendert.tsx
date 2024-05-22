import ReactFlow, {
	Controls,
	Background,
	applyNodeChanges,
	applyEdgeChanges,
	useEdgesState,
	updateEdge,
	addEdge,
	Edge,
	OnNodesChange,
	Node,
	OnEdgesChange,
	OnConnect,
	Connection,
} from "reactflow";

import "reactflow/dist/style.css";
import { useCallback, useMemo } from "react";

import ButtonEdge from "./ButtonEdge.tsx";
import CustomNode from "./CustomNode.tsx";

const defaultViewport = { x: 0, y: 0, zoom: 1 };
const edgeTypes = { buttonEdge: ButtonEdge };

interface IReactFlowRender {
	nodes: Node[];
	setNodes: React.Dispatch<
		React.SetStateAction<Node<Node[], string | undefined>[]>
	>;
	createNodeHandler: (
		clientX: number | null,
		clientY: number | number
	) => void;
}

function ReactFlowRender({
	nodes,
	setNodes,
	createNodeHandler,
}: IReactFlowRender) {
	const [edges, setEdges] = useEdgesState<Edge[]>([]);

	const nodeTypes = useMemo(() => ({ nameChanger: CustomNode }), []);

	const onEdgeUpdate = useCallback(
		(oldEdge: Edge, newConnection: Connection) =>
			setEdges((els) => updateEdge(oldEdge, newConnection, els)),
		[setEdges]
	);
	const onConnect: OnConnect = useCallback(
		(params) => {
			// console.log({ params });
			// params.type = `buttonEdge`;
			setEdges((els) => addEdge(params, els));
		},
		[setEdges]
	);

	const onNodesChange: OnNodesChange = useCallback(
		(changes) => setNodes((nds: Node[]) => applyNodeChanges(changes, nds)),
		[setNodes]
	);
	const onEdgesChange: OnEdgesChange = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[setEdges]
	);

	return (
		<>
			<div
				className="bg-white hover:cursor-wait w-[80%] react-flow"
				onDragOver={(e) => {
					e.preventDefault();
					// console.log(e.clientX);
					// console.log(e.dataTransfer.getData("text/plain"));
				}}
				onDrop={(e) => {
					e.preventDefault();
					console.log(e.clientX);
					createNodeHandler(e.clientX, e.clientY);
					// console.log(e.target);
				}}
			>
				<ReactFlow
					nodes={nodes}
					onNodesChange={onNodesChange}
					edges={edges}
					onEdgesChange={onEdgesChange}
					fitView
					defaultViewport={defaultViewport}
					minZoom={0.4}
					maxZoom={1.2}
					nodeTypes={nodeTypes}
					edgeTypes={edgeTypes}
					onEdgeUpdate={onEdgeUpdate}
					onConnect={onConnect}
				>
					<Background className=" rounded-md" />
					<Controls />
				</ReactFlow>
			</div>
		</>
	);
}

export default ReactFlowRender;
