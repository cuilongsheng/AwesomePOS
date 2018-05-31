<template>
    <div class="leftNav">
        <ul id="menu">
            <router-link to="/Pos">
                <li>
                    <i class="iconfont icon-goumai"></i>
                    <p>收银</p>
                </li>
            </router-link>
            <router-link to="/Shop">
            <li>
                <i class="iconfont icon-home"></i>
                <p>店铺</p>
            </li>
            </router-link>
            <li>
                <i class="iconfont icon-diannao"></i>
                <p>商品</p>
            </li>
            <li>
                <i class="iconfont icon-membership-card_icon"></i>
                <p>会员</p>
            </li>
            <li>
                <i class="iconfont icon-shezhi"></i>
                <p>设置</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: "leftNav",
  data() {
    return {};
  }
};
</script>
<style scoped>

.leftNav {
  color: white;
  font-size: 0.16rem;
  height: 100%;
  background-color: #1d8ce0;
  float: left;
  width: 5%;
}
.iconfont {
  font-size: 0.24rem;
}
.leftNav li {
  list-style: none;
  text-align: center;
  border-bottom: 0.02rem solid #20a0ff;
  padding: 0.2rem 0.1rem;
}
.leftNav ul .router-link{
    color:rgb(219, 229, 233)
}
#menu p {
  padding: 0.05rem 0;
}
.router-link-active{
  color:white;
}
.router-link-active li{
    border-bottom: 0.02rem solid rgb(219, 211, 211);
}
</style>
