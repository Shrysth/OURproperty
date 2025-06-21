import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

// export const options = {
//   stages: [
//     { duration: '2m', target: 500 },  
//     { duration: '2m', target: 1000 }, 
//     { duration: '2m', target: 1500 }, 
//     { duration: '2m', target: 2000 }, 
//     { duration: '2m', target: 3000 },
//     { duration: '2m', target: 5000 }, 
//   ],
// };
// k6 test adjustments
export const options = {
  stages: [
    { duration: '2m', target: 2000 }, // Gradual ramp-up
    { duration: '2m', target: 3000 },
    { duration: '2m', target: 4000 }
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // <1% errors
    http_req_duration: ['p(95)<3000'] // Alert if p95 >3s
  }
};

export default function () {
  const res = http.get('http://localhost:3000/');
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  sleep(1); // Simulate user think time
}
// import { sleep } from 'k6';

// export const options = {
//   stages: [
//     { duration: '2m', target: 500 },  
//     { duration: '2m', target: 1000 }, 
//     { duration: '2m', target: 1500 }, 
//     // { duration: '2m', target: 5000 }, 
//   ],
// };

// export default function () {
//   http.get('http://127.0.0.1:5501/index.html');
//   sleep(1); // Simulate user think time
// }