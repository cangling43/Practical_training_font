
const GetMap = (keyword, subdistrict, key) => {
    return request({
        url: 'https://restapi.amap.com/v3/config/district',
        method: "GET",
        data: {
            keywords,
            subdistrict,
            key,
        }
    })
}


export default {
    GetMap
}