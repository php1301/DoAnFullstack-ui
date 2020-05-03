import fetch from 'isomorphic-unfetch';
import shuffle from 'lodash/shuffle';
// fetch của Next-js recommend
const FetchAPIData = (url) => fetch(url)
  .then((r) => r.json())
  .then((data) => data);
const GetAPIData = async (apiUrl) => {
  const promises = apiUrl.map(async (repo) => {
    const apiPath = `${process.env.SERVER_API}/static/data`; // đọc từ biến env
    const api = `${apiPath}/${repo.endpoint}.json`;
    // console.log(api, 'api api');
    const response = await FetchAPIData(api);
    return {
      name: repo.name,
      data: response,
    };
  });
  const receviedData = await Promise.all(promises);
  return receviedData;
};
export default GetAPIData;
