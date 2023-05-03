import "../../styles/pages/front-page.scss";
import { createRoot } from "@wordpress/element";
import CountdownTimer from "./Countdown";
import { newSlider } from "../swiper";

(function initSlider() {
	const entertainmentSlider = document.getElementById("entertainment-slider");
	const registrationSlider = document.getElementById("registration-slider");
	newSlider(entertainmentSlider);
	newSlider(registrationSlider);
})();

function App() {
	return <CountdownTimer />;
}

createRoot(document.getElementById("countdown")).render(<App />);
