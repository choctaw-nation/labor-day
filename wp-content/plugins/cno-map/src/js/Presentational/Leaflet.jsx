import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const choctawHQ = [33.97382992138244, -96.3988494873047];
const tuskahoma = [34.6179833, -95.2772455];

export function Map() {
	return (
		<MapContainer
			id="map"
			center={tuskahoma}
			zoom={14}
			scrollWheelZoom={false}>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
			/>
			<Marker position={tuskahoma}>
				<Popup>Tʋskahoma</Popup>
			</Marker>
		</MapContainer>
	);
}
