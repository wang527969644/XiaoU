import $axios from 'axios'


//商品管理列表请求
export async function getGoodsList(){
    const res = await  $axios.get('/api/goodslist')
    if(res.code ==200){
        return res.list
    }
    return false
}
//获取商品总数
export async function getTotal(){
    const res = await $axios('/api/goodscount')
    if(res.code == 200 ){
        return res.list[0].total
    }
    return false
}
  //根据ID找到当前点击的商品详情
  export async function getGoodsById(id){
    const res = await $axios.get('/api/goodsinfo',{params:{id}})
    if(res.code == 200){
        return res.list
    }
    return false
  }
//更新商品信息
export async function updateGoodsInfo(params){
    const fd = new FormData()
    for(let k in params){
        fd.append(k,params[k])
    } 
    const res = await $axios.post('/api/goodsedit',fd) 
    if(res.code == 200){
        return res.list
    }
    return false
}