<template>
    <div class="pos">
        <el-row >
            <el-col :span='10' ref="order-list">
                <el-tabs type="border-card">
                    <el-tab-pane label="结账">
                         <el-table
                          :data="tableData"
                          stripe
                          border
                          style="width: 100%">
                          <el-table-column
                            prop="goodsName"
                            label="商品名称"
                            width="180">
                          </el-table-column>
                          <el-table-column
                            prop="price"
                            label="金额（元） ">
                          </el-table-column>
                          <el-table-column
                            prop="count"
                            label="数量（个）">
                          </el-table-column>
                          <el-table-column
                              fixed="right"
                              label="操作">
                              <template slot-scope="scope">
                              <el-button type="danger" size="small" @click="delSingleGoods(scope.row)" circle><i class="iconfont icon-jian"></i></true></el-button>
                              <el-button @click="addGoodLists(scope.row)" type="primary" size="small" circle><i class="iconfont icon-jia"></i></circle></el-button>
                            </template>
                           </el-table-column>
                        </el-table>
                         <div class="total">
                            <span><small>总价：</small>{{totalMoney}}元</span>
                            <span><small>总数量：</small>{{totalCount}}个</span>
                          </div>
                    </el-tab-pane>
                    <el-tab-pane label="挂单">挂单</el-tab-pane>
                    <el-tab-pane label="外卖">外卖</el-tab-pane>
                    <div>
                </div>
                </el-tabs>

                <el-row class="btns">
                  <el-button type="warning" >挂单</el-button>
                  <el-button type="danger" @click="delAll">删除 </el-button>
                  <el-button type="success" @click="checkout">结账</el-button>
                </el-row>
            </el-col>
            <!--商品展示-->
            <el-col :span="14">
             <div class="often-goods">
                <div class="title">常用商品</div>
                <div class="often-goods-list">
                    <ul class='cookList'>
                      <li v-for="goods in oftenGoods" @click="addGoodLists(goods)">
                        <span class="goodsName">{{goods.goodsName}}</span>
                        <span class="goodsPrice">￥{{goods.price}}元</span>
                      </li>
                    </ul>
                </div>
           </div>
            <el-tabs type="border-card">
              <el-tab-pane label="主食">
                <ul class='cookList'>
                  <li v-for="goods in type0Goods" @click="addGoodLists(goods)">
                    <span class="goodsImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="goodsName">{{goods.goodsName}}</span>
                    <span class="goodsPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="小食">
                <ul class='cookList'>
                  <li v-for="goods in type1Goods" @click="addGoodLists(goods)">
                    <span class="goodsImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="goodsName">{{goods.goodsName}}</span>
                    <span class="goodsPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
                </el-tab-pane>
              <el-tab-pane label="饮料">
                <ul class='cookList'>
                  <li v-for="goods in type2Goods" @click="addGoodLists(goods)">
                    <span class="goodsImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="goodsName">{{goods.goodsName}}</span>
                    <span class="goodsPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="套餐">
                <ul class='cookList'>
                  <li v-for="goods in type3Goods" @click="addGoodLists(goods)">
                    <span class="goodsImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="goodsName">{{goods.goodsName}}</span>
                    <span class="goodsPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Pos",
  data() {
    return {
      tableData: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalCount:0,
      totalMoney:0
    };
  },
  created() {
    //常用商品列表
    axios
      .get("http://jspang.com/DemoApi/oftenGoods.php")
      .then(response => {
        this.oftenGoods = response.data;
      })
      .catch(error => {
        alert("网络错误,不能访问");
      });

    //读取分类商品列表
    axios.get("http://jspang.com/DemoApi/typeGoods.php")
      .then(response => {
        //this.oftenGoods=response.data;
        this.type0Goods = response.data[0];
        this.type1Goods = response.data[1];
        this.type2Goods = response.data[2];
        this.type3Goods = response.data[3];
      })
      .catch(error => {
        alert("网络错误，不能访问");
      });
  },
  methods:{
    addGoodLists(goods){
      this.totalCount=0; //汇总数量清0
      this.totalMoney=0; //汇总价格清0
      //判断列表中是否有此商品,第一次是没有的,如果有,则数量+1,如果没有,则添加goods对象到tableData
      var isHave = false;
      for(let i=0;i<this.tableData.length;i++){
        if(goods.goodsId==this.tableData[i].goodsId){
          isHave = true;
        }
      };
      //数量+1
      if(isHave){
        let arr = this.tableData.filter(function(o){
          return o.goodsId==goods.goodsId
        });
        arr[0].count++;
      }else{
        let newGood = {goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
        this.tableData.push(newGood);
      };
      this.getTotal();
    },
    getTotal(){
      this.totalCount=0;
      this.totalMoney=0;
      //算出总价格和总数量
      this.tableData.forEach(e=>{
        this.totalCount += e.count;
        this.totalMoney = this.totalMoney+ (e.price* e.count)
      });
    },
    delSingleGoods(goods){
      if(goods.count>1){
        let arr = this.tableData.filter(function(o){
          return o.goodsId==goods.goodsId
        });
        arr[0].count--;
        this.getTotal();
      }else{
        this.tableData = this.tableData.filter(o=>o.goodsId != goods.goodsId);
        this.getTotal();
      }
    },
    delAll(){
      if(this.totalCount===0){
        this.$message.error('您还未点单!');
      }else{
        this.tableData=[];
        this.totalCount=0;
        this.totalMoney = 0;
      }
    },
    checkout(){
      if(this.totalCount != 0){
        this.$message({
          message:'结账成功, 总金额为: '+ this.totalMoney +'元, 谢谢您的惠顾!',
          type: "success"
        });
        this.delAll();
      }else{
        this.$message.error('不能空结账,谢谢!');
      }

    }
  }
};
</script>
<style scoped>
.btns {
  text-align: center;
  margin-top: 0.3rem;
}
.title {
  height: 0.2rem;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 0.1rem;
}
.often-goods-list ul li {
  list-style: none;
  float: left;
  border: 1px solid #e5e9f2;
  padding: 0.1rem;
  margin: 0.05rem;
  background-color: #fff;
}
.o-price {
  color: #58b7ff;
}
.cookList li {
  list-style: none;
  width: 25%;
  border: 1px solid #e5e9f2;
  height: auto;
  overflow: hidden;
  background-color: #fff;
  padding: 0.02rem;
  float: left;
  margin: 0.02rem;
  cursor: pointer;
}
.cookList li span {
  display: block;
  float: left;
}
.goodsImg {
  width: 15%;
}
.goodsName {
  font-size: 0.16rem;
  padding-left: 0.1rem;
  color: brown;
}
.goodsPrice {
  font-size: 0.16rem;
  padding-left: 0.1rem;
  padding-top: 0.1rem;
}
.el-tabs:nth-child(2) {
  display: inline-block;
  width: 100%;
}
.total{
  border:1px solid #eff2f7;
  border-top:none;
  text-align: center;
  background-color:#f5f7fa;
}
.total span{
  font-size: 0.18rem;
  line-height: 0.5rem;
}
.total span:nth-child(2){
  margin-left: 0.4rem;
}
.el-button--small.is-circle{
  padding:0.05rem;
}
</style>
