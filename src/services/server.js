import request from '../utils/request';

export function fetchMore({ page=1,limit=20,issuser }) {
  return request(`/rights/api/list?page=${page}&limit=${limit}&issuser=${issuser}`);
}
export function fetchSList() {
  return request('/rights/api/slist');
}
export function fetchDetail(rightid) {
  return request(`/rights/api/info/${rightid}`);
}
export function fetchMineWel() {
  return request(`/rights/user/list`);
}

export function fetchAccess({ mobile, ticket }) {
  console.log(mobile,ticket)
  const bodyContent = `mobile=${mobile}&ticket=${ticket}`
  return request('/rights/user/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: bodyContent
  });
}
export function fetchRightCode(rightid) {
  return request('/rights/user/receive', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `rightid=${rightid}`
  });
}
