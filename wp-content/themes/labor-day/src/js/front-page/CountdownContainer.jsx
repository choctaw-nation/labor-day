export default function CountdownContainer( { type, data, delay } ) {
	return (
		<div
			className={ `countdown__${ type.toLowerCase() } d-flex flex-column align-items-center animate__animated animate__fadeInRight` }
		>
			<span>{ data }</span>
			<span className="fs-4 fw-bold text-uppercase">{ type }</span>
		</div>
	);
}
