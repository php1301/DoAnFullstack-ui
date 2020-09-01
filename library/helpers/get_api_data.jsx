import fetch from 'isomorphic-unfetch';
import shuffle from 'lodash/shuffle';
// fetch của Next-js recommend

const FetchAPIData = (url) => fetch(url)
  .then((r) => r.json())
  .then((data) => data);

export const ProcessAPIData = (apiData) => {
  const fetchData = {};
  if (apiData) {
    apiData.forEach((item, key) => {
      fetchData.data = item.data ? [...item.data] : [];
      fetchData.name = item.name ?? '';
    });
  }
  // mảng object fetched data
  const data = fetchData ?? [];
  return data;
};

export const SearchedData = (processedData) => {
  const randNumber = Math.floor(Math.random() * 50 + 1);
  const data = shuffle(processedData.slice(0, randNumber));
  return data;
};

export const SearchStateKeyCheck = (state) => {
  Object.keys(state).forEach((key) => {
    if (
      state[key] !== null
      && state[key] !== ''
      && state[key] !== []
      && state[key] !== 0
      && state[key] !== 100
    ) { return true; }
    return false;
  });
};

// Ki thuat paginator - spread data hien giờ + slice số lượng data thêm vô
// bắt đầu từ: độ dài hiện giờ của posts
// kết thúc từ độ dài hiện giờ của posts + số lượng data responsive từ limit
export const Paginator = (posts, processedData, limit) => [...posts, ...processedData
  .slice(posts.length, posts.length + limit)];


const GetAPIData = async (apiUrl) => {
  const promises = apiUrl.map(async (repo) => {
    console.log(process.env.SERVER_API)
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
