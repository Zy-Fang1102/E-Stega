import axios from 'axios'

export const getExcelData = () => {
  return axios.get('http://localhost:8080/system/compare/api/data'); // 调用后端 API
}
