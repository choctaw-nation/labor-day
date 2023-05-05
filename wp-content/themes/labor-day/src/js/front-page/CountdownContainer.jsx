export default function CountdownContainer( { type, data, delay } ) {
	return (
		<div
			className={ `countdown__${ type.toLowerCase() } animate__animated animate__fadeInRight` }
		>
			<span>{ data }</span>
			<span className="label">{ type }</span>
		</div>
	);
}
