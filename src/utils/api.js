import axios from "axios";

const API_KEY =  process.env.REACT_APP_API_KEY;

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization : `Bearer ${API_KEY}`,
        // Authorization : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTE4OWUwODYxMzk5NGI0ZWE0YzhmYWRkZjJkZmUxYiIsIm5iZiI6MTcyNDk4MjQyNi4xNjY5MTcsInN1YiI6IjY2MGQwZWFmMTQ5NTY1MDE2M2JhZDdhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zFyvt4kiPPySTVh_IZ1C9IfyWhA4_T_CIgcfbRhwkSs`,
        accept: 'application/json'
    }
})

// 요청 인터셉터 추가하기
axios.interceptors.request.use(function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
}, function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
});

// 응답 인터셉터 추가하기
axios.interceptors.response.use(function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
}, function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
});


export default api;