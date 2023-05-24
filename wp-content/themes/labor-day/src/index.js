import './styles/main.scss';
import { ScheduleManager } from './js/add-to-schedule/controller';
import './js/dropdownNav';
import fadeIn from './js/fadeOnScroll';
import WeatherAlert from './js/weather-alert/weatherAlert';
fadeIn('.fadeIn');
const weatherAlert = new WeatherAlert();

const allAnchors = document.querySelectorAll('a');
allAnchors.forEach((anchor) => {
	if (anchor.href.includes(cnoSiteData.rootUrl)) return;
	anchor.target = '_blank';
	anchor.rel = 'noopener noreferrer';
});
