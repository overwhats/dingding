<template>
  <div id="app">
    <!--<router-view/>-->
    <!--<van-button v-if="!code" type="info" size="small" class="login" @click="login">一 键 登 录</van-button>-->
    <div v-if="!code" class="bac" >
      <div class="btn"  @click="login"></div>
      <img src="./assets/bac.png" alt="">
    </div>
    <template v-else>
      <keep-alive><router-view/></keep-alive>
    </template>
  </div>
</template>
<script>
import RequestLoading from "@/components/RequestLoading.vue";
import dayjs from 'dayjs'
import vue from "vue";
import { Button, Toast } from "vant";
import { getUserId, enableEvatation, carAdd , getUserInfo} from "@/api/user";
import { getUrlParam, setToken, removeToken } from "@/utils/auth";
vue.use(Button).use(Toast);
export default {
  name: "App",
  components: {
    RequestLoading
  },
  data() {
    return {
      code: ""
    };
  },
  methods: {
    login() {
      this.createDDurl();
    },
    createDDurl() {
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        const appId = process.env.VUE_APP_LOGIN_APPID;
        const REDIRECT_URL = encodeURI(process.env.VUE_APP_LOGIN_REDIRECT_URL);
        window.location.href = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appId}&response_type=code&scope=snsapi_auth&state=STATE&redirect_uri=${REDIRECT_URL}`;
      } else {
        this.code = "";
        Toast("请在手机版钉钉上打开");
      }
    },
    enableInvitate(userId) {
      enableEvatation({ userId: userId }).then(
        res => {
          if (res.code === "200") {
            console.log(res.data);
            localStorage.setItem("invitateOver", res.data);
            res.data + "" === "1"
              ? this.$router.replace({
                  path: "/Evaluation",
                  params: { enable: res.data, userId: userId }
                })
              : this.$router.replace({
                  path: "/Invitate",
                  params: { enable: res.data, userId: userId }
                });
          } else {
            Toast(res.text);
          }
        },
        err => {
          Toast(err.text);
        }
      );
    }
  },
  created() {
    this.code = getUrlParam("code");
    // this.code= 'uj16ewmjWSQutKkWNSiPBXAiEiE'
    // getUserInfo({unionId: this.code, date: dayjs().format('YYYYMMDD')}).then(res => {
    //   if (res.code === "200") {
    //     localStorage.userInfo = JSON.stringify(res.data[0]);
    //   } else {
    //     Toast.fail(res.text);
    //   }
    // },err=> {
    //   Toast.fail(err.text);
    // });
    // return;
    if (this.code&& !localStorage.id) {
      getUserId({ code: this.code }).then(
        res => {
          if (res.code === "200") {
            let userId = res.data.id;
            localStorage.id = userId;
            getUserInfo({unionId: userId, date: dayjs().format('YYYYMMDD')}).then(res => {
              if (res.code === "200") {
                localStorage.userInfo = JSON.stringify(res.data[0]);
              } else {
                Toast.fail(res.text);
              }
            },err=> {
              Toast.fail(err.text);
            });
          } else {
            Toast.fail(res.text);
          }
        },
        err => {
          Toast.fail(err.text);
        }
      );
    }
    /*else{
			  setToken('38b47992-c8');
          }*/
  },
  mounted() {
    //测试
    // this.enableInvitate('38b47992-c8')
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 14px;
  min-height: 100vh;
  background-color: #F7F5F6;
}
.bac{
  height: 100vh;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  img{
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }
  .btn{
    position: absolute;
    width:300px;
    height: 44px;
    z-index: 10;
    left: 50%;
    transform: translateX(-50%);
    top: 305px;
  }
}
body,
html {
  margin: 0;
  min-height: 100vh;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.login {
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  height: 44px;
  text-align: center;
}
</style>
