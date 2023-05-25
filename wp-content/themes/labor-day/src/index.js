import './styles/main.scss';
import { ScheduleManager } from './js/add-to-schedule/controller';
import './js/dropdownNav';
import WeatherAlert from './js/weather-alert/weatherAlert';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
const weatherAlert = new WeatherAlert();

AOS.init({ easing: 'ease-out', duration: 600, offset: 150, once: true });
const allAnchors = document.querySelectorAll('a');
allAnchors.forEach((anchor) => {
	if (anchor.href.includes(cnoSiteData.rootUrl)) return;
	anchor.target = '_blank';
	anchor.rel = 'noopener noreferrer';
});
