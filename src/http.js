import axios from 'axios'

const http=axios.create({
    baseURL:'http://catbk.cn:3000'
})
export default http;