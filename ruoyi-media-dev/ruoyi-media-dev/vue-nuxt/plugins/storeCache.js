import { getToken } from '@/utils/token'
export default function(ctx){
  //离开页面 刷新前 将store中的数据存到session
  window.addEventListener('beforeunload', ()=> {
    if (getToken()&& ctx.store.state.token) {
       sessionStorage.setItem("storeCache",JSON.stringify(ctx.store.state))
    }
  });
  //页面加载完成  将session中的store数据
  window.addEventListener('load', ()=> {
    let storeCache = sessionStorage.getItem("storeCache")
    if(storeCache){
      // 将session中的store数据替换到store中
      ctx.store.replaceState(JSON.parse(storeCache));
    }
  });
}
