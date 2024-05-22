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

import ButtonEdge from "./CustomElements/ButtonEdge.tsx";
import CustomNode from "./CustomElements/CustomNode.tsx";

/**
 * Default viewport configuration for the ReactFlow instance.
 */
const defaultViewport = { x: 0, y: 0, zoom: 1 };

/**
 * Denotes the custom Edge and configures it with ReactFlow instance
 */
const edgeTypes = { buttonEdge: ButtonEdge };

/**
 * React component rendering the ReactFlow instance with custom nodes and edges.
 *
 * @prop {Node[]} nodes - nodes to be displayed in the flow.
 * @prop {function} setNodes - Default by ReactFlow => Function to update the nodes state.
 * @prop {function} createNodeHandler - Function to handle "Create Node" event.
 */
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

	/**
	 * memoized function defining custom Nodes
	 */
	const nodeTypes = useMemo(() => ({ nameChanger: CustomNode }), []);

	/**
	 * Callback function to update existing edges based on connection changes.
	 */
	const onEdgeUpdate = useCallback(
		(oldEdge: Edge, newConnection: Connection) =>
			setEdges((els) => updateEdge(oldEdge, newConnection, els)),
		[setEdges]
	);

    /**
     * Default by reactflow , to change the edge connections
     */
	const onConnect: OnConnect = useCallback(
		(params) => {
			setEdges((els) => addEdge(params, els));
		},
		[setEdges]
	);

    /**
     * Callbacks to update node and edge states 
     */
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
				}}
				onDrop={(e) => {
					e.preventDefault();
					// console.log(e.clientX);
					createNodeHandler(e.clientX, e.clientY);
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
