import { useSelector } from "react-redux";

function MessageToast() {
	const messages = useSelector((state) => state.message); //從 redux 取出資料，然後把資料渲染出來

	return (
		<div
			className="toast-container position-fixed bottom-0 start-0 p-3"
			style={{ zIndex: 2000 }}
		>
			{messages.map((msg) => (
				<div
					key={msg.id}
					className="toast show"
					role="alert"
					aria-live="assertive"
					aria-atomic="true"
				>
					<div className={`toast-header text-white bg-${msg.type}`}>
						<strong className="me-auto">
							{msg.type === "success" ? (
								<i className="bi bi-check-all "></i>
							) : (
								<i className="bi bi-x-octagon-fill"></i>
							)}
						</strong>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="toast"
							aria-label="Close"
						></button>
					</div>
					<div className="toast-body">{msg.text}</div>
				</div>
			))}
		</div>
	);
}

export default MessageToast;
