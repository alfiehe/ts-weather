import colors from 'colors';
import axios, { AxiosResponse } from 'axios';
import { Command } from 'commander';
const program = new Command();

const cmd = program
  .version('0.0.1')
  .option('-c, --city [name]', 'Add city name')
  .parse(process.argv);

const cmdOpts = cmd.opts();
if (!cmdOpts.city) {
  cmd.outputHelp(colors.red);
}
const city = cmd.getOptionValue('city');

// 处理网络请求
interface IWeatherResponse {
  status: string;
  count: string;
  info: string;
  infocode: string;
  lives: ILive[];
}
interface ILive {
  province: string;
  city: string;
  adcode: string;
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
  reporttime: string;
}

const URL = 'https://restapi.amap.com/v3/weather/weatherInfo';
const key = 'b479f2155a73bf1a046dac387052beb5';

async function getWeather(city: string) {
  try {
    const url = `${URL}?city=${encodeURI(city)}&key=${key}&extensions=base`;
    const response = await axios.get(url);
    const live = response.data.lives[0]; 
    console.log({ live });
    console.log(colors.yellow(live.reporttime));
    console.log(colors.white(`${live.province} ${live.city}`));
    console.log(colors.green(`${live.weather} ${live.temperature} 度`));
  } catch {
    console.log(colors.red('天气服务出现异常'));
  }
}

getWeather(city);
