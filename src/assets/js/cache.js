import storage from "good-storage";

// 接口token
const ACCESS_TOKEN = "__access_token__";



function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare);
  if (index === 0) {
    return;
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

// 缓存access token
export function saveAccessToken(str) {
  storage.set(ACCESS_TOKEN, str);
  return str;
}

// 读取access token
export function loadAccessToken() {
  return storage.get(ACCESS_TOKEN, '');
}

