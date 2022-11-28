export interface FormGetWeatherProps {
  cityRef: React.Ref<HTMLInputElement> | undefined;
  handleWeather: (e: any) => void;
  isFetching: boolean;
}
