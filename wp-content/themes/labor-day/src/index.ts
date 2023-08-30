import './styles/main.scss';
import './js/dropdownNav';
import WeatherAlert from './js/weather-alert/weatherAlert';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
const weatherAlert = new WeatherAlert();

AOS.init({ easing: 'ease-out', duration: 600, once: true });
const allAnchors = document.querySelectorAll('a');
allAnchors.forEach((anchor) => {
	if (anchor.href.includes(cnoSiteData.rootUrl)) return;
	console.log(anchor);
	anchor.target = '_blank';
	anchor.rel = 'noopener noreferrer';
});
