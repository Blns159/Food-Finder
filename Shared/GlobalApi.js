const { default: axios } = require("axios");

const getGooglePlace=(category,radius,lat,lng)=>axios.get('/api/google-place?'+
'category='+category+'&radius='+radius+'&lat='+lat+'&lng='+lng)
// Xem hấn trả về dạng nào 
export default{
    getGooglePlace
}