import {CustomAxios} from './CustomAxios'
import {config} from './config'


 const CategorySearch = async ({searchCategory,searchQuery})=>{

  const queryList = [];
  queryList.push(`query=${searchQuery}`);

const result = await CustomAxios.get(`${config.server_address}/search/${searchCategory}?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}


 const MultiSearch = async (searchQuery)=>{

  const queryList = [];
  queryList.push(`query=${searchQuery}`);

const result = await CustomAxios.get(`${config.server_address}/search/multi?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}


export {
  CategorySearch,
  MultiSearch
}
