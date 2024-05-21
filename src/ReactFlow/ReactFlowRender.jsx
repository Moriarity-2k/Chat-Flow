import ReactFlow, {
	Controls,
	Background,
	applyNodeChanges,
	applyEdgeChanges,
	useNodesState,
	useEdgesState,
	updateEdge,
	addEdge,
} from "reactflow";

import "reactflow/dist/style.css";
import { useCallback, useEffect, useMemo } from "react";

import ButtonEdge from "./ButtonEdge";
import CustomNode from "./CustomNode";

const defaultViewport = { x: 0, y: 0, zoom: 1 };
const edgeTypes = { buttonEdge: ButtonEdge };

function ReactFlowRender() {
	const [nodes, setNodes] = useNodesState([]);
	const [edges, setEdges] = useEdgesState([]);

	const nodeTypes = useMemo(() => ({ nameChanger: CustomNode }), []);

	const onEdgeUpdate = useCallback(
		(oldEdge, newConnection) =>
			setEdges((els) => updateEdge(oldEdge, newConnection, els)),
		[]
	);
	const onConnect = useCallback((params) => {
		// console.log({ params });
		params.type = `buttonEdge`;
		setEdges((els) => addEdge(params, els));
	}, []);

	const onNodesChange = useCallback((changes) => {
		console.log({ changes });
		setNodes((nds) => applyNodeChanges(changes, nds));
	}, []);
	const onEdgesChange = useCallback((changes) => {
		console.log({ changes });
		// if(changes.type === 'select')
		setEdges((eds) => applyEdgeChanges(changes, eds));
	}, []);

	useEffect(() => {
		console.log(edges);
	}, [edges]);

	return (
		<>
			<button
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
			<div className="h-[60vh] mt-6 w-[80%] bg-slate-200 hover:cursor-wait">
				<ReactFlow
					nodes={nodes}
					onNodesChange={onNodesChange}
					edges={edges}
					onEdgesChange={onEdgesChange}
					fitView
					defaultViewport={defaultViewport}
					minZoom={0.4}
					maxZoom={2}
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
