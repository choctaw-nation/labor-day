import './styles/main.scss';
import { Offcanvas } from 'bootstrap';
import { ScheduleManager } from './js/add-to-schedule/controller';
import './js/dropdownNav';
import fadeIn from './js/fadeOnScroll';
import WeatherAlert from './js/weather-alert/weatherAlert';
fadeIn('.fadeIn');
const weatherAlert = new WeatherAlert();
