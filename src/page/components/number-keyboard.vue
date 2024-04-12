<template>
  <div class="key-container">
      <div class="keyboard" @click.stop="handleKeyPress">
          <div class="key-row">
              <div class="cell-box">
                  <div class="key-cell" data-num="1">1</div>
              </div>
              <div class="cell-box">
                  <div class="key-cell" data-num="2">2</div>
              </div>
              <div class="cell-box">
                  <div class="key-cell" data-num="3">3</div>
              </div>
          </div>
          <div class="key-row">
                <div class="cell-box">
                  <div class="key-cell" data-num="4">4</div>
              </div>
              <div class="cell-box">
                  <div class="key-cell" data-num="5">5</div>
              </div>
              <div class="cell-box">
                  <div class="key-cell" data-num="6">6</div>
              </div>
          </div>
          <div class="key-row">
            <div class="cell-box">
                  <div class="key-cell" data-num="7">7</div>
              </div>
              <div class="cell-box">
                  <div class="key-cell" data-num="8">8</div>
              </div>
              <div class="cell-box">
                  <div class="key-cell" data-num="9">9</div>
              </div>
          </div>
          <div class="key-row">
            <div class="cell-box">
                  <div class="key-cell" data-num=".">.</div>
              </div> 
              <div class="cell-box">
                  <div class="key-cell" data-num="0">0</div>
              </div>
              <div class="cell-box">
                  <div class="key-cell" data-num="D">删除</div>
              </div>
          </div>
          <!-- <div class="key-row">
               <div class="cell-box">
                  <div class="key-cell" data-num=".">.</div>
              </div> 
              <div class="cell-box">
                  <div class="key-cell" data-num="0">0</div>
              </div>
               <div class="cell-box">
                  <div class="key-cell key-delete" data-num="C">删除</div>
              </div> 
              <div class="cell-box">
                  <div class="key-cell" data-num></div>
              </div>
              <div class="cell-box">
                  <div class="key-cell" data-num></div>
              </div>
              <div class="cell-box">
                  <div class="key-cell" data-num></div>
              </div>
          </div> -->
          <!-- <div class="key-right-clear">
              <div class="key-clear" data-num="C">清空</div>
          </div>
          <div class="key-right-confirm">
              <div class="key-confirm" data-num="S">报工</div>
          </div> -->
      </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'
export default {
    props: {
        clickTime: Number,
        fatherNum: {
            type: String,
            default: ''
        }
    },
    setup (props, { emit }) {
        let num = ref('')
        let click = ref(0)
        num.value = props.fatherNum
        function handleKeyPress (e: any) {
            //console.log(e, "is")
            const number = e.target.dataset.num;
            // console.log(number, "is")
            // 不同的按键处理逻辑
            // num为空，直接返回
            if (!number) return;
            switch (String(number)) {
                // 删除键
                case "D":
                    handleDeleteKey();
                    break;
                // 清空键
                case "C":
                    handleClearKey();
                    break;
                // 确认键
                case "S":
                    handleConfirmKey();
                    break;
                default:
                    handleNumberKey(number);
                    break;
            }
        }
        function handleDeleteKey () {
            // console.log(fatherNum, "fatherNum is")
            // num.value = fatherNum; // 这一步是为了让this.num能及时接收this.fatherNum的值，解决第二行输入后去删除第一行值出现的bug
            let S = num.value;
            // console.log(S, "S is")
            // if (!S.toString()) return false;
            if (!S.toString().length) return false;// 如果没有输入（或者长度为0），直接返回
            // 否则删除最后一个
            num.value = S.toString().substring(0, S.toString().length - 1)
            // console.log(num.value, "value is")
            emit("deleteEvent", num.value); //把删除处理后了的值返回给父组件
        }
        // 处理清空键
        function handleClearKey () {
            num.value = ''; // 清空就赋值一个‘’，然后返回给父组件
            emit("clearEvent", num.value);
        }
        // 处理数字
        function handleNumberKey (number: string) {
              // console.log(fatherNum, "fatherNum is")
            // click.value = clickTime;
            click.value++
            // 拿到父组件点击的那个输入框的值
            let S = undefined
            if (num.value) {
                S = num.value + ''
            }
            //   第一次不能输入.
            if (click.value == 1) {
                if (number == ".") {
                    return
                }
            }
            //前提是并非刚点击了input
            if (click.value != 1) {
                // 若this.num有且只有一位数并且是0，则输入的不是.，就返回
                if (S && S.length == 1 && S[0] == '0' && number != ".") return;
                if (S) {
                    let index = S.indexOf(".");
                    // 如果存在.，则不能再次输入.
                    if (index > -1 && number == ".") {
                        return;
                    }
                    //   小数位数不能超过2位
                    // if (S && index > -1 && S.length - 2 > index) return;
                }
            }
            if (!S) {
                //如果是首次输入，则原有的this.num是undefined,不需要拼接上
                num.value = number;
            } else {
                num.value = S + number // 在原有的基础上将点击的那个数字按键的数字加在原有数字字符串末尾，此处是为删除提供数据
            }
            //   此处不能使用正则表达式判断

            // emit("numberEvent", number); // 注意传的是点击的那个数字字符串，不是处理后的整个数字字符串
            emit("numberEvent", num.value)
        }
        // 确认键
        function handleConfirmKey () {
            // 这一步是为了解决一进页面，input框内有值，直接点确认出现数据情况，再次点数据出现undefined问题(如果没有该赋值，this.num为undefined)
            // num.value = fatherNum;
            // const S = num.value;
            // // 如果输入的数字最后一位是.，则删除
            // if (S) {
            //     let index = S.toString().indexOf(".");
            //     if (index == S.length - 1) {
            //         num.value = S.substring(0, S.length - 1);
            //     }
            // }

            emit("confirmEvent");
        }
        return {
            handleKeyPress
        }
    }
}
</script>

<style lang="scss" scoped>
.key-container {
  width: 380px;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  color: rgba(51, 51, 51, 0.85);
  position: fixed;
  bottom: 0;
  left: 50%;
  margin-left: -190px;
  z-index: 2999;

  .keyboard {
      width: 100%;
      background-color: #fff;
      padding: 0.05rem;
      background: rgba(240, 240, 240);
      box-sizing: border-box;

      .key-row {
          display: flex;
          display: -webkit-flex;
          position: relative;
          line-height: 0.6rem;

          &::before {
              content: "";
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
              height: 1px;
              color: #d5d5d6;
              -webkit-transform-origin: 0 0;
              transform-origin: 0 0;
              -webkit-transform: scaleY(0.5);
              transform: scaleY(0.5);
          }
      }

      .cell-box {
          font-size: 0.26rem;
          font-weight: bold;
          flex: 1;
          -webkit-box-flex: 1;
          text-align: center;
          position: relative;
          padding: 0.05rem;
          box-sizing: border-box;

          &::after {
              content: "";
              position: absolute;
              overflow: hidden;
              top: 0;
              right: 0;
              bottom: 0;
              height: 200%;
              color: #d5d5d6;
              -webkit-transform-origin: 0 0;
              transform-origin: 0 0;
              -webkit-transform: scaleY(0.5);
              transform: scaleY(0.5);
          }

          &:nth-last-child(1)::after {
              border-right: 0;
          }
      }

      .key-cell {
          background: #fff;
          border-radius: 0.1rem;
          cursor: pointer;
      }

      .key-delete {
          font-size: 0.28rem;
      }

      .key-right-confirm {
          font-size: 0.28rem;
          padding: 0.05rem;
          position: absolute;
          text-align: center;
          height: 2.1rem;
          width: 23%;
          line-height: 2.1rem;
          background: rgba(240, 240, 240);
          z-index: 5;
          right: 0.05rem;
          bottom: 0.05rem;
      }

      .key-right-clear {
          font-size: 0.28rem;
          padding: 0.05rem;
          position: absolute;
          text-align: center;
          height: 2.1rem;
          width: 23%;
          line-height: 2.1rem;
          background: rgba(240, 240, 240);
          z-index: 5;
          right: 0.05rem;
          top: 0.05rem;
      }

      .key-confirm {
          border-radius: 0.1rem;
          background: #1561b3;
          color: #fff;
      }

      .key-clear {
          border-radius: 0.1rem;
          background: #fff;
      }
  }
}</style>

