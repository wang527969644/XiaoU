import $axios from 'axios'


//请求商品规格列表
export async function getSpecsList(params){
    const res = await $axios.get('/api/specslist',{params})
    if(res.code ==200){
        return res.list
    }
    return false
}
//根据ID获取商品规格信息

export async function getSpecsById(id){
    const res = await $axios.get(`/api/specsinfo?id=${id}`)
    console.log(res)
    if(res.code == 200){
        return res.list
        
    }
    return false
}