//引入axios
import $axios from 'axios'


//获取商品分类信息

export async function getGoodsList(){
    const res =  await $axios.get('/api/catelist?istree=1')
    if(res.code == 200){
        return res.list
    }
    return false
}

//获取商品分类修改信息   

export async function getGoodsEdit(id){
    const res = await $axios.get('/api/cateinfo',{params:{id}})
    if(res.code == 200){
        return res.list
    }
    return false
}