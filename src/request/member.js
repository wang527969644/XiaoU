//导入axios

import $axios from 'axios'

//获取会员列表
export async function getMemberList(){
    const res = await $axios.get('/api/memberlist')
    if(res.code == 200){
        return res.list
    }
    return false
}
