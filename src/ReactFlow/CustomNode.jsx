import { useState } from "react";
import { MdClose } from "react-icons/md";
import { Handle, Position } from "reactflow";
import { createPortal } from "react-dom";

export default function NodeWithNameChange(props) {
	const [name, setName] = useState("Test Node");
	const [hover, setHover] = useState(false);

	const [open, setOpen] = useState(false);
	return (
		<>
			<div className="">
				<Handle type="source" position={Position.Top} id="top" />
				<Handle type="target" position={Position.Bottom} id="right" />
				<div
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					className=""
				>
					<div className="flex">
						<div className="text-black text-[6px] mt-1">{name}</div>
						<button
							onClick={() => {
								// console.log(props.data);
								props.data.deleteNode();
							}}
							className="text-[10px] ml-2 text-red-800 font-mono hover:cursor-pointer"
						>
							<MdClose
								className={hover ? "opacity-100" : "opacity-0"}
							/>
						</button>
					</div>
					<div
						onClick={() => {
							setOpen(true);
							console.log("click");
						}}
						className="h-[1rem] w-[1rem] my-1 bg-black shadow-lg rounded-md p-4"
					></div>
				</div>
			</div>

			{open &&
				createPortal(
					<div className="backdrop-blur-sm w-full h-screen absolute top-0 left-0 flex items-center justify-center z-10">
						<div className="bg-[#023db385] rounded-md p-8 z-100 absolute top-10 right-10 w-[20%] backdrop:blur-lg backdrop-blur-lg">
							<form
								className="flex flex-col gap-4 text-black"
								onSubmit={(e) => {
									setOpen(false);
								}}
							>
								<label
									htmlFor="NameChange"
									className="font-bold text-lg tracking-widest text-white"
								>
									Enter the Name
								</label>
								<input
									name="NameChange"
									className="text-[10px] bg-[#f0f8ffd7] px-2 py-3 rounded-md text-black w-full inset-0 outline-none "
									value={name}
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
								<button
									className="bg-[#00308F] text-white px-4 py-2 rounded-md w-max lowercase"
									type="submit"
								>
									Save
								</button>
							</form>
						</div>
					</div>,
					document.querySelector("body")
				)}
		</>
	);
}
