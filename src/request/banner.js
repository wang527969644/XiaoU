import $axios from 'axios'

export async function getBannerList(){
    const res = await $axios.get('/api/bannerlist')
    if(res.code == 200){
        return res.list
    }
    return false
}
//根据ID获取该轮播图
export async function getBannerById(id){
    const res = await $axios.get('/api/bannerinfo',{params:{id}})
    if(res.code == 200){
        return res.list
    }
    return false
}