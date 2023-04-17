export default function CountdownContainer({ type, data }) {
	return (
		<div className={`countdown__${type.toLowerCase()}`}>
			<span>{data}</span>
			<span className="label">{type}</span>
		</div>
	);
}
