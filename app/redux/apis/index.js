import {create} from 'apisauce';

const api = create({
  baseURL: 'https://thefork.p.rapidapi.com',
  headers: {
    'x-rapidapi-host': 'thefork.p.rapidapi.com',
    'x-rapidapi-key': '0564be5631mshba140d474ae424bp143350jsn50437687cfd5',
    useQueryString: true,
  },
});

export const getRestaurents = () =>
  api.get(
    '/restaurants/list?pageNumber=1&queryPlaceValueCoordinatesLongitude=9.189982&pageSize=10&queryPlaceValueCoordinatesLatitude=45.4642035&queryPlaceValueCityId=348156',
  );
