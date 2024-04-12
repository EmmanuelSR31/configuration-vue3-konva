<template>
  <div class="editConfiguration_main">
    <div class="config-header">
      <a href="javascript:void(0)">{{basicSettings.name}}</a>
      <span class="config-header-btn">
        <a @click="viewConfig" style="" href="javascript:void(0);">预览</a>
        <a @click="closeConfig" href="javascript:void(0);">关闭</a>
        <a @click="saveConfig" href="javascript:void(0);">保存</a>
      </span>
    </div>
    <div class="config-con">
      <div class="config-left">
        <ul>
          <li :class="{'active': curItemListType === 'common'}" @click="setCurItemListType('common')"><a href="javascript:void(0)">基本</a></li>
          <li :class="{'active': curItemListType === 'chart'}" @click="setCurItemListType('chart')"><a href="javascript:void(0)">组件</a></li>
          <li :class="{'active': curItemListType === 'device'}" @click="setCurItemListType('device')"><a href="javascript:void(0)">图库</a></li>
          <li :class="{'active': curItemListType === 'img'}" @click="setCurItemListType('img')"><a href="javascript:void(0)">图形</a></li>
          <li :class="{'active': curItemListType === 'canvas'}" @click="setCurItemListType('canvas')"><a href="javascript:void(0)">动画</a></li>
          <!-- <li :class="{'active': curItemListType === 'uploadImg'}" @click="setCurItemListType('uploadImg')"><a href="javascript:void(0)">上传</a></li> -->
        </ul>
      </div>
      <div class="config-item-con" v-show="itemListShow">
        <div class="config-item-top" v-show="curItemListType === 'device'">
          {{svgItemsTypeTitle}}
          <a href="javascript:void(0)" @click="toggleDeviceItemType">
            <svg class="icon" aria-hidden="true" :style="{transform: 'rotate(' + (deviceItemTypeShow ? 0 : 180) + 'deg)'}">
              <use xlink:href="#iconxiangxiazhanhang"></use>
            </svg>
          </a>
        </div>
        <div class="config-item-list-con" :style="{height: curItemListType === 'device' ? 'calc(100% - 20px)' : '100%'}">
          <ul class="config-common-item-list" v-show="curItemListType === 'common'">
            <li v-for="(item, index) in commonItems" :key="'commonItems' + index">
              <div class="drag" draggable="true" @dragstart="dragstartLeft(item)">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="'#' + item.icon"></use>
                </svg>
                <h3>{{item.name}}</h3>
              </div>
            </li>
          </ul>
          <ul v-show="curItemListType === 'chart'" class="config-item-list">
            <li v-for="(item, index) in chartItems" :key="'chartItems' + index">
              <div class="drag" draggable="true" @dragstart="dragstartLeft(item)"><img :alt="item.name" :title="item.name" :src="item.img"></div>
            </li>
          </ul>
          <div v-show="deviceItemTypeShow && curItemListType === 'device'" class="config-item-type-con">
            <ul>
              <li :class="{'active': svgItemsTypeTitle === '容器'}" @click="setSvgItems('svgContainerItems', '容器')">容器</li>
              <li :class="{'active': svgItemsTypeTitle === '阀门'}" @click="setSvgItems('svgValveItems', '阀门')">阀门</li>
              <li :class="{'active': svgItemsTypeTitle === '水处理'}" @click="setSvgItems('svgWaterItems', '水处理')">水处理</li>
              <li :class="{'active': svgItemsTypeTitle === '机器'}" @click="setSvgItems('svgMachineItems', '机器')">机器</li>
              <li :class="{'active': svgItemsTypeTitle === '发动机'}" @click="setSvgItems('svgEngineItems', '发动机')">发动机</li>
              <li :class="{'active': svgItemsTypeTitle === '物料运输'}" @click="setSvgItems('svgCarriageItems', '物料运输')">物料运输</li>
              <li :class="{'active': svgItemsTypeTitle === '鼓风机'}" @click="setSvgItems('svgBlowerItems', '鼓风机')">鼓风机</li>
              <li :class="{'active': svgItemsTypeTitle === '锅炉'}" @click="setSvgItems('svgBoilerItems', '锅炉')">锅炉</li>
              <li :class="{'active': svgItemsTypeTitle === '电源'}" @click="setSvgItems('svgElectricityItems', '电源')">电源</li>
              <li :class="{'active': svgItemsTypeTitle === '管道'}" @click="setSvgItems('svgPipeItems', '管道')">管道</li>
              <li :class="{'active': svgItemsTypeTitle === '工业'}" @click="setSvgItems('svgIndustrialItems', '工业')">工业</li>
              <li :class="{'active': svgItemsTypeTitle === '食品加工'}" @click="setSvgItems('svgFoodItems', '食品加工')">食品加工</li>
              <li :class="{'active': svgItemsTypeTitle === '物流'}" @click="setSvgItems('svgLogisticsItems', '物流')">物流</li>
              <li :class="{'active': svgItemsTypeTitle === '加热器'}" @click="setSvgItems('svgHeaterItems', '加热器')">加热器</li>
              <li :class="{'active': svgItemsTypeTitle === 'HAVC'}" @click="setSvgItems('svgHavcItems', 'HAVC')">HAVC</li>
              <li :class="{'active': svgItemsTypeTitle === '化学'}" @click="setSvgItems('svgChemicalItems', '化学')">化学</li>
              <li :class="{'active': svgItemsTypeTitle === '工厂设施'}" @click="setSvgItems('svgPlantItems', '工厂设施')">工厂设施</li>
              <li :class="{'active': svgItemsTypeTitle === '建筑'}" @click="setSvgItems('svgBuildingItems', '建筑')">建筑</li>
              <li :class="{'active': svgItemsTypeTitle === '仪表'}" @click="setSvgItems('svgMeterItems', '仪表')">仪表</li>
              <li :class="{'active': svgItemsTypeTitle === '医学'}" @click="setSvgItems('svgMedicalItems', '医学')">医学</li>
              <li :class="{'active': svgItemsTypeTitle === '其他'}" @click="setSvgItems('svgOtherItems', '其他')">其他</li>
            </ul>
          </div>
          <ul v-show="!deviceItemTypeShow && curItemListType === 'device'" class="config-item-list">
            <li v-for="(item, index) in svgItems" :key="'svgItems' + index">
              <div class="drag" draggable="true" @dragstart="dragstartLeft(item)"><img :alt="item.name" :title="item.name" :src="item.img"></div>
            </li>
          </ul>
          <ul v-show="curItemListType === 'img'" class="config-item-list config-img-item-list">
            <li v-for="(item, index) in imgItems" :key="'imgItems' + index">
              <div class="drag" draggable="true" @dragstart="dragstartLeft(item)"><img :src="item.img"></div>
            </li>
          </ul>
          <ul v-show="curItemListType === 'canvas'" class="config-item-list">
            <li v-for="(item, index) in canvasItems" :key="'canvasItems' + index">
              <div class="drag" draggable="true" @dragstart="dragstartLeft(item)"><img :alt="item.name" :title="item.name" :src="item.img"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="config-center" :style="{width: rightShow ? 'calc(100% - 380px)' : 'calc(100% - 60px)'}">
      <div :style="getBasicStyle">
      <div @dragover="e=>e.preventDefault()" @drop="drop" :class="{'config-center-bg': basicSettings.showAuxiliaryLine}" :style="{width: basicSettings.width + 'px', height: basicSettings.height + 'px'}">
      <v-stage :config="basicSettings" @click="stageClick" @contextmenu="stageContextmenu">
        <v-layer ref="layer">
          <template v-for="(item ,index) in items">
            <template v-if="item.type === 'device'">
              <v-image :config="configImg(item)" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend"></v-image>
            </template>
            <template v-else-if="item.type === 'text'">
              <v-label :config="configLabel(item)" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend">
                <v-tag :config="configTag(item)"></v-tag>
                <v-text :config="configText(item)"></v-text>
              </v-label>
            </template>
            <template v-else-if="item.type === 'datetime'">
              <v-label :config="configLabel(item)" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend">
                <v-tag :config="configTag(item)"></v-tag>
                <v-text :config="configDatetime(item)"></v-text>
              </v-label>
            </template>
            <template v-else-if="item.type === 'weather'">
              <v-image :config="configWeather(item)" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend"></v-image>
            </template>
            <template v-else-if="item.type === 'chart'">
              <template v-if="item.category === 'valve'">
                <v-image :config="configDeviceImg(item)" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend"></v-image>
              </template>
              <template v-else-if="item.category === 'waterPump'">
                <v-image :config="configDeviceImg(item)" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend"></v-image>
              </template>
              <template v-else-if="item.category === 'waterPumpHorizontal'">
                <v-image :config="configDeviceImg(item)" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend"></v-image>
              </template>
              <template v-else-if="item.category === 'waterBox'">
                <v-group :config="configWaterBoxGroup(item)" @dragstart="dragstart(item, $event)" @dragmove="dragmove" @dragend="dragend" @transformend="transformend">
                  <v-rect :config="configWaterBoxBack(item)"></v-rect>
                  <v-rect :config="configWaterBoxWater(item)"></v-rect>
                  <v-line :config="configWaterBoxLine(item)"></v-line>
                </v-group>
              </template>
              <template v-else-if="item.category === 'value'">
                <v-label :config="configLabel(item)" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend">
                  <v-tag :config="configTag(item)"></v-tag>
                  <v-text :config="configValue(item)"></v-text>
                </v-label>
              </template>
              <template v-else-if="item.category === 'echart-line'">
                <v-image :config="configEcharts(item, 'assets/img/device/echart-line.png')" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend"></v-image>
              </template>
              <template v-else-if="item.category === 'status'">
                <v-circle :config="configStatus(item)" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend"></v-circle>
              </template>
              <template v-else-if="item.category === 'simpleButton'">
                <v-label :config="configLabel(item)" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend">
                  <v-tag :config="configTag(item)"></v-tag>
                  <v-text :config="configSimpleButtonText(item)"></v-text>
                </v-label>
              </template>
              <template v-else-if="item.category === 'button'">
                <v-label :config="configLabel(item)" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend">
                  <v-tag :config="configButtunTag(item)"></v-tag>
                  <v-text :config="configSimpleButtonText(item)"></v-text>
                </v-label>
              </template>
              <template v-else-if="item.category === 'line'">
                <v-group :config="configLineGroup(item)" @dragstart="dragstart(item, $event)" @dragmove="dragmove" @dragend="dragend" @transformend="transformend">
                  <v-line :config="configLine(item)"></v-line>
                  <v-circle :config="configLineAnchor(item1)" v-for="(item1, index1) in item.anchorPoints" @dragstart="dragstartLineAnchor(item1, index1, item)" @dragmove="dragmoveLineAnchor" @dragend="dragendLineAnchor" :key="index1"></v-circle>
                  <v-circle :config="configLineMiddle(item2)" v-for="(item2, index2) in item.middlePoints" @dragstart="dragstartLineMiddle(item2, index2, item)" @dragmove="dragmoveLineMiddle" @dragend="dragendLineMiddle" :key="index2"></v-circle>
                </v-group>
              </template>
            </template>
            <template v-else-if="item.type === 'pip-h'">
              <v-group :config="configLineGroup(item)" @dragstart="dragstart(item, $event)" @dragmove="dragmove" @dragend="dragend" @transformend="transformend">
                <v-line :config="configLine(item)"></v-line>
                <v-line :config="configLinePipe(item)" :ref="'linePipe' + item.id"></v-line>
                <v-circle :config="configLineAnchor(item1)" v-for="(item1, index1) in item.anchorPoints" @dragstart="dragstartLineAnchor(item1, index1, item)" @dragmove="dragmoveLineAnchor" @dragend="dragendLineAnchor" :key="index1"></v-circle>
                <v-circle :config="configLineMiddle(item2)" v-for="(item2, index2) in item.middlePoints" @dragstart="dragstartLineMiddle(item2, index2, item)" @dragmove="dragmoveLineMiddle" @dragend="dragendLineMiddle" :key="index2"></v-circle>
              </v-group>
            </template>
            <template v-else-if="item.type === 'liquidfill'">
              <v-image :config="configEcharts(item, 'assets/img/canvas/liquidfill.jpg')" @dragstart="dragstart(item, $event)" @dragend="dragend" @transformend="transformend"></v-image>
            </template>
          </template>
          <v-transformer ref="transformer" />
        </v-layer>
      </v-stage>
      </div>
      </div>
    </div>
    <div class="contextmenu-con" v-show="contextmenuShow" @mouseleave="contextMenuClose" :style="{left: contextMenu.x + 'px', top: contextMenu.y + 'px'}">
      <ul>
        <li @click="moveUp">上移一层</li>
        <li @click="moveDown">下移一层</li>
        <li @click="moveTop">置于顶层</li>
        <li @click="moveBottom">置于底层</li>
        <li @click="itemCopy">复制</li>
        <li @click="delItem">删除</li>
      </ul>
    </div>
    <div class="config-right" :class="{'config-right-hide': !rightShow}">
      <div class="config-right-toggle-btn">
        <a href="javascript:void(0)" :class="{'config-right-hide-btn': !rightShow}" @click="toggleRight">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconxiayibu"></use>
          </svg>
        </a>
      </div>
      <n-tabs type="line" justify-content="space-around">
        <n-tab-pane tab="组件属性" name="name1">
          <div class="config-right-from-con">
            {{ moveObj }}
            <n-form :model="moveObj" label-placement="top">
              <n-collapse>
                <n-collapse-item title="公共属性" v-show="!util.isEmpty(moveObj.type) && moveObj.type !== 'pip-h' && moveObj.category !== 'line'" name="1">
                  <n-form-item label="大小">
                    宽&nbsp;<n-input-number :min="1" v-model:value="moveObj.width" @update:value="refreshDraw" style="width: 120px;" />&nbsp;
                    高&nbsp;<n-input-number :min="1" v-model:value="moveObj.height" @update:value="refreshDraw" style="width: 120px;" />
                  </n-form-item>
                  <n-form-item label="位置">
                    X&nbsp;&nbsp;<n-input-number :min="1" v-model:value="moveObj.x" @update:value="refreshDraw" style="width: 120px;" />&nbsp;
                    Y&nbsp;&nbsp;<n-input-number :min="1" v-model:value="moveObj.y" @update:value="refreshDraw" style="width: 120px;" />
                  </n-form-item>
                  <n-form-item label="缩放">
                    宽&nbsp;&nbsp;<n-input-number :min="0" v-model:value="moveObj.scaleX" @update:value="refreshDraw" style="width: 120px;" />&nbsp;
                    高&nbsp;&nbsp;<n-input-number :min="0" v-model:value="moveObj.scaleY" @update:value="refreshDraw" style="width: 120px;" />
                  </n-form-item>
                  <n-form-item label="旋转">
                    <n-input-number v-model:value="moveObj.rotation" />
                  </n-form-item>
                  <n-form-item label="透明度">
                    <n-input-number :min="0" :max="1" :step="0.1" v-model:value="moveObj.opacity" />
                  </n-form-item>
                </n-collapse-item>
                <n-collapse-item title="外观" v-show="['text', 'datetime', 'pip-h', 'liquidfill'].includes(moveObj.type) || ['waterBox', 'value', 'echart-line', 'status', 'simpleButton', 'button', 'line'].includes(moveObj.category)" name="2">
                  <template v-if="['pip-h'].includes(moveObj.type)">
                    <n-form-item label="流动颜色">
                      <n-color-picker v-model:value="moveObj.pipelineColor" />
                    </n-form-item>
                    <n-form-item label="底色">
                      <n-color-picker v-model:value="moveObj.color" />
                    </n-form-item>
                    <n-form-item label="流动块粗细">
                      <n-input-number :min="1" v-model:value="moveObj.pipeStrokeWidth" />
                    </n-form-item>
                    <n-form-item label="底部粗细">
                      <n-input-number :min="1" v-model:value="moveObj.strokeWidth" />
                    </n-form-item>
                  </template>
                  <template v-else-if="['line'].includes(moveObj.category)">
                    <n-form-item label="线条颜色">
                      <n-color-picker v-model:value="moveObj.color" />
                    </n-form-item>
                    <n-form-item label="线条粗细">
                      <n-input-number :min="1" v-model:value="moveObj.strokeWidth" />
                    </n-form-item>
                  </template>
                  <template v-else>
                    <n-form-item label="文本内容" v-show="['text'].includes(moveObj.type) || ['simpleButton', 'button'].includes(moveObj.category)">
                      <n-input v-model:value="moveObj.text" />
                    </n-form-item>
                    <n-form-item label="单位" v-show="['liquidfill'].includes(moveObj.type) || ['value'].includes(moveObj.category)">
                      <n-input v-model:value="moveObj.unitText" />
                    </n-form-item>
                    <template v-if="['text', 'datetime', 'liquidfill'].includes(moveObj.type) || ['value', 'echart-line', 'simpleButton', 'button'].includes(moveObj.category)">
                      <n-form-item label="字体大小">
                        <n-input-number :min="10" v-model:value="moveObj.fontSize" />
                      </n-form-item>
                      <n-form-item label="字体颜色">
                        <n-color-picker v-model:value="moveObj.color" />
                      </n-form-item>
                      <template v-if="['text', 'datetime'].includes(moveObj.type) || ['value', 'simpleButton', 'button'].includes(moveObj.category)">
                        <n-form-item label="字体">
                          <n-select v-model:value="moveObj.fontFamily" :options="fontFamilys" value-field="value" label-field="name"></n-select>
                        </n-form-item>
                        <n-form-item label="文本左右对齐">
                          <n-radio-group v-model:value="moveObj.align">
                            <n-radio-button value="left" label="左对齐"></n-radio-button>
                            <n-radio-button value="center" label="居中对齐"></n-radio-button>
                            <n-radio-button value="right" label="右对齐"></n-radio-button>
                          </n-radio-group>
                        </n-form-item>
                        <n-form-item label="文本上下对齐">
                          <n-radio-group v-model:value="moveObj.verticalAlign">
                            <n-radio-button value="top" label="上对齐"></n-radio-button>
                            <n-radio-button value="middle" label="居中对齐"></n-radio-button>
                            <n-radio-button value="bottom" label="下对齐"></n-radio-button>
                          </n-radio-group>
                        </n-form-item>
                        <n-form-item label="文本样式" class="config-font-style-a-con">
                          <a href="javascript:void(0)" :class="{'active': moveObj.fontWeight === 'bold'}" @click="moveObj.fontWeight = moveObj.fontWeight === 'normal' ? 'bold' : 'normal'">
                            <svg class="icon" aria-hidden="true">
                              <use xlink:href="#iconzitijiacu"></use>
                            </svg>
                          </a>
                          <a href="javascript:void(0)" :class="{'active': moveObj.fontStyle === 'italic'}" @click="moveObj.fontStyle = moveObj.fontStyle === 'normal' ? 'italic' : 'normal'">
                            <svg class="icon" aria-hidden="true">
                              <use xlink:href="#iconzitixieti"></use>
                            </svg>
                          </a>
                          <a href="javascript:void(0)" :class="{'active': moveObj.textDecoration === 'underline'}" @click="moveObj.textDecoration = moveObj.textDecoration === 'none' ? 'underline' : 'none'">
                            <svg class="icon" aria-hidden="true">
                              <use xlink:href="#iconzitixiahuaxian"></use>
                            </svg>
                          </a>
                        </n-form-item>
                        <n-form-item label="文本行高">
                          <n-input-number :min="1" v-model:value="moveObj.lineHeight" />
                        </n-form-item>
                        <n-form-item label="内边距">
                          <n-input-number :min="0" v-model:value="moveObj.padding" />
                        </n-form-item>
                      </template>
                    </template>
                    <template v-if="!['echart-line'].includes(moveObj.category)">
                      <n-form-item label="边框大小">
                        <n-input-number :min="0" v-model:value="moveObj.strokeWidth" />
                      </n-form-item>
                      <n-form-item label="边框颜色">
                        <n-color-picker v-model:value="moveObj.stroke" />
                      </n-form-item>
                    </template>
                    <template v-if="['text', 'datetime', 'liquidfill'].includes(moveObj.type) || ['waterBox', 'value', 'simpleButton', 'button'].includes(moveObj.category)">
                      <template v-if="!['waterBox'].includes(moveObj.category)">
                        <n-form-item label="边框样式">
                          <n-radio-group v-model:value="moveObj.borderStyle">
                            <n-radio-button value="solid" label="实线"></n-radio-button>
                            <n-radio-button value="dashed" label="虚线"></n-radio-button>
                            <n-radio-button value="dotted" label="点状"></n-radio-button>
                          </n-radio-group>
                        </n-form-item>
                        <n-form-item label="边框圆角" v-if="!['liquidfill'].includes(moveObj.type)">
                          <n-input-number :min="0" v-model:value="moveObj.cornerRadius" />
                        </n-form-item>
                      </template>
                      <n-form-item label="水颜色" v-if="['waterBox'].includes(moveObj.category)">
                        <n-color-picker v-model:value="moveObj.color" />
                      </n-form-item>
                      <n-form-item label="背景颜色">
                        <n-color-picker v-model:value="moveObj.backColor" />
                      </n-form-item>
                    </template>
                    <n-form-item label="激活背景颜色" v-show="['button'].includes(moveObj.category)">
                      <n-color-picker v-model:value="moveObj.activeBackColor" />
                    </n-form-item>
                  </template>
                  <template v-if="['echart-line'].includes(moveObj.category)">
                    <n-form-item label="轴线颜色">
                      <n-color-picker v-model:value="moveObj.lineColor" />
                    </n-form-item>
                  </template>
                  <template v-if="['liquidfill'].includes(moveObj.type)">
                    <n-form-item label="形状">
                      <n-select v-model:value="moveObj.shape" :options="liquidfillShapeList" value-field="id" label-field="text"></n-select>
                    </n-form-item>
                    <n-form-item label="水波颜色">
                      <n-color-picker v-model:value="moveObj.liquidColor" />
                    </n-form-item>
                    <n-form-item label="水波透明度">
                      <n-input-number :min="0" :max="1" v-model:value="moveObj.liquidOpacity" />
                    </n-form-item>
                    <n-form-item label="边框距离">
                      <n-input-number :min="0" v-model:value="moveObj.borderDistance" />
                    </n-form-item>
                  </template>
                </n-collapse-item>
              </n-collapse>
            </n-form>
          </div>
        </n-tab-pane>
        <n-tab-pane tab="数据属性" name="name2">
          <div class="config-right-from-con">
            <n-form :model="moveObj" label-placement="top">
              <n-form-item label="绑定设备">
                <n-select v-model:value="moveObj.deviceId" :options="deviceList" value-field="deviceId" label-field="deviceName" @update:value="selectDevice" filterable></n-select>
              </n-form-item>
              <n-form-item label="传感器">
                <n-select v-model:value="moveObj.deviceDataId" :options="deviceDataList" value-field="deviceDataId" :render-label="renderDeviceDataLabel" @update:value="selectDeviceData" filterable></n-select>
              </n-form-item>
              <n-form-item label="高度(峰值)" v-show="['waterBox'].includes(moveObj.category) || ['liquidfill'].includes(moveObj.type)">
                <n-input-number :min="0" v-model:value="moveObj.maxHeight" />
              </n-form-item>
              <n-form-item label="状态条件" v-show="['status'].includes(moveObj.category)">
                <div>
                  <n-button type="info" size="small" @click="addStatusData">新增</n-button>
                  <n-data-table :columns="statusColumns" :data="statusData" :single-line="false" ref="elTable">
                  </n-data-table>
                </div>
              </n-form-item>
            </n-form>
          </div>
        </n-tab-pane>
        <n-tab-pane tab="画布属性" name="name3">
          <div class="config-right-from-con">
            <n-form :model="basicSettings" label-placement="top">
              <n-form-item label="名称">
                <n-input v-model:value="basicSettings.name"></n-input>
              </n-form-item>
              <n-form-item label="画布宽">
                <n-input-number :min="1" v-model:value="basicSettings.width" />
              </n-form-item>
              <n-form-item label="画布高">
                <n-input-number :min="1" v-model:value="basicSettings.height" />
              </n-form-item>
              <n-form-item label="画布自适应">
                <n-switch v-model:value="basicSettings.adapt" />
              </n-form-item>
              <n-form-item label="显示辅助线">
                <n-switch v-model:value="basicSettings.showAuxiliaryLine" />
              </n-form-item>
              <n-form-item label="背景颜色">
                <n-color-picker v-model:value="basicSettings.backColor" />
              </n-form-item>
              <n-form-item label="背景图片">
                <upload-single :action="uploadRoot + '/module/oss/upload'" :fileObj="{ossId: basicSettings.ossId, fileName: basicSettings.fileName, relativePath:  basicSettings.relativePath}" @upload-success="upBackSuccess" isImg accept="image/*" :isPreview="true"></upload-single>
              </n-form-item>
            </n-form>
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import common from '@/page/mixins/common' // 基本混入
import configuration from './configuration'
import { getCurrentInstance, ref, nextTick, h } from 'vue'
import { IInterfaceData, IUploadResData } from '@/page/interface/interface'
import { NInput, NColorPicker, SelectOption } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import Konva from 'konva'
import uploadSingle from '@/page/components/uploadSingle.vue'
export default {
  components: { uploadSingle },
  setup () {
    const proxy: any = getCurrentInstance()!.proxy
    let { util, uploadRoot } = common()
    let { method, id, items, configImg, configLabel, configTag, configText, configDatetime, configDeviceImg, configWaterBoxGroup, configWaterBoxBack, configWaterBoxWater,
      configWaterBoxLine, configValue, configStatus, configSimpleButtonText, configButtunTag, configLineGroup, configLine, configLinePipe, basicSettings, getBasicStyle } = configuration()
    let commonItems = ref(proxy.$store.state.commonItems) // 基本
    let chartItems = ref(proxy.$store.state.chartItems) // 组件
    let svgItems = ref(proxy.$store.state.svgContainerItems) // 图库
    let imgItems = ref(proxy.$store.state.imgItems) // 图形
    let canvasItems = ref(proxy.$store.state.canvasItems) // 动画
    let switchs = ref(proxy.$store.state.switchs) // 开关组
    let svgItemsTypeTitle = ref('容器') // 图库类别名
    let curItemListType = ref('common') // 当前显示图片列表类型
    let itemListShow = ref(true) // 图片列表是否显示
    let deviceItemTypeShow = ref(false) // 图库分类是否显示
    let fontFamilys = ref([ // 字体
      { name: '微软雅黑', value: 'Microsoft YaHei' },
      { name: '数字LED', value: 'LcdD' }
    ])
    function init (m: string, i: string, obj: any) {
      method.value = m
      id.value = i
      if (method.value === 'add') {
        basicSettings.value.name = obj.name
        basicSettings.value.cover = obj.cover
      } else if (method.value === 'edit') {
        proxy.$api.post('commonRoot', '/v2/apps/graphics/obtainDeviceGraphicsData', { id: id.value }, (r: any) => {
          if (r.data.status) {
            let temp = JSON.parse(r.data.data.graphicsJson)
            basicSettings.value = temp.basicSettings
            items.value = temp.items
          }
        })
      }
      getDevice()
    }
    /**
    * @desc 设置当前左侧显示类型
    * @param {String} val 显示类型
    */
    function setCurItemListType (val: string) {
      if (curItemListType.value === val) {
        itemListShow.value = !itemListShow.value
      } else {
        curItemListType.value = val
        itemListShow.value = true
      }
    }
    /**
    * @desc 切换显示图库分类
    */
    function toggleDeviceItemType () {
      deviceItemTypeShow.value = !deviceItemTypeShow.value
    }
    /**
    * @desc 设置svg图库列表
    * @param {String} name 图库列表名
    * @param {String} title 图库名
    */
    function setSvgItems (name: string, title: string) {
      svgItems.value = proxy.$store.state[name]
      svgItemsTypeTitle.value = title
      deviceItemTypeShow.value = false
    }
    let dragObj = ref<any>({}) // 左侧拖动组件
    function dragstartLeft (item: any) {
      dragObj.value = item
    }
    function drop (e :any) {
      console.log(e)
      let temp = util.value.deepClone(dragObj.value)
      temp.id = new Date().getTime() + ''
      temp.opacity = 1
      temp.rotation = 0
      temp.scaleX = 1
      temp.scaleY = 1
      temp.deviceId = ''
      temp.deviceDataId = ''
      temp.draggable = true
      if (dragObj.value.category === 'line' || dragObj.value.type === 'pip-h') {
        temp.points = [e.offsetX, e.offsetY, e.offsetX + dragObj.value.width, e.offsetY]
        temp.anchorPoints = [{ x: e.offsetX, y: e.offsetY, category: 'line' }, { x: e.offsetX + dragObj.value.width, y: e.offsetY, category: 'line' }]
        temp.middlePoints = [{ x: e.offsetX + (dragObj.value.width / 2), y: e.offsetY, category: 'line' }]
        temp.x = 0
        temp.y = 0
        temp.draggable = false
        temp.group = { x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, draggable: true}
      } else {
        temp.x = e.offsetX
        temp.y = e.offsetY
      }
      items.value.push(temp)
      console.log(items.value)
      // 流动动画
      if (dragObj.value.type === 'pip-h') {
        setTimeout(() => {
          let obj = proxy.$refs['linePipe' + temp.id][0].getNode()
          console.log(obj)
          const anim = new Konva.Animation(function(frame) {
            let temp = obj.attrs.dashOffset
            if (isNaN(obj.attrs.dashOffset)) {
              obj.dashOffset(0)
            }
            if (temp > (obj.attrs.dashWidth + obj.attrs.dashOffset)) {
              obj.dashOffset(0)
            }
            obj.dashOffset(obj.attrs.dashOffset - 1)
          }, obj.getLayer())
          anim.start()
        }, 500)
      }
    }
    /**
    * @desc 天气配置
    */
    function configWeather (item: any) {
      var imageObj = new Image()
      imageObj.src = '/assets/img/device/weather' + item.category + '.png'
      item.image = imageObj
      return item
    }
    /**
    * @desc Echarts配置
    */
    function configEcharts (item: any, src: string) {
      let obj = util.value.deepClone(item)
      var imageObj = new Image()
      imageObj.src = src
      obj.image = imageObj
      obj.strokeWidth = 0
      return obj
    }
    // 水波形状数据
    const liquidfillShapeList = [
      { id: 'circle', text: '圆形' },
      { id: 'rect', text: '方形' },
      { id: 'roundRect', text: '圆角方形' },
      { id: 'triangle', text: '三角形' },
      { id: 'diamond', text: '菱形' },
      { id: 'pin', text: '别针' }
    ]
    /**
    * @desc 线条端点配置
    */
    function configLineAnchor (item: any) {
      item.radius = 5
      item.stroke = 'black'
      item.strokeWidth = 2
      item.draggable = true
      return item
    }
    /**
    * @desc 线条中点配置
    */
    function configLineMiddle (item: any) {
      item.radius = 5
      item.stroke = 'blue'
      item.strokeWidth = 2
      item.draggable = true
      return item
    }
    let moveLineAnchorObj = ref<any>({}) // 移动中的线条端点
    let moveLineAnchorIndex = ref(0) // 移动中的线条端点位置
    /**
    * @desc 端点拖动开始
    */
    function dragstartLineAnchor (item: any, index: number, lineObj: any) {
      moveLineAnchorObj.value = item
      moveLineAnchorIndex.value = index
      moveObj.value = lineObj
    }
    /**
    * @desc 端点拖动中
    */
    function dragmoveLineAnchor (e: any) {
      console.log(e)
      moveLineAnchorObj.value.y = e.target.attrs.y
      moveLineAnchorObj.value.x = e.target.attrs.x
      // 拖动端点时移动线条
      moveObj.value.points[moveLineAnchorIndex.value * 2] = e.target.attrs.x
      moveObj.value.points[moveLineAnchorIndex.value * 2 + 1] = e.target.attrs.y
      // 拖动端点时移动中点
      // 第一个端点时
      if (moveLineAnchorIndex.value === 0) {
        moveObj.value.middlePoints[moveLineAnchorIndex.value].x = (moveObj.value.points[moveLineAnchorIndex.value * 2] + moveObj.value.x + moveObj.value.points[moveLineAnchorIndex.value * 2 + 2] + moveObj.value.x) / 2
        moveObj.value.middlePoints[moveLineAnchorIndex.value].y = (moveObj.value.points[moveLineAnchorIndex.value * 2 + 1] + moveObj.value.y + moveObj.value.points[moveLineAnchorIndex.value * 2 + 3] + moveObj.value.y) / 2
      // 中间端点时
      } else if (moveLineAnchorIndex.value !== (moveObj.value.anchorPoints.length - 1)) {
        moveObj.value.middlePoints[moveLineAnchorIndex.value - 1].x = (moveObj.value.points[moveLineAnchorIndex.value * 2] + moveObj.value.x + moveObj.value.points[moveLineAnchorIndex.value * 2 - 2] + moveObj.value.x) / 2
        moveObj.value.middlePoints[moveLineAnchorIndex.value - 1].y = (moveObj.value.points[moveLineAnchorIndex.value * 2 + 1] + moveObj.value.y + moveObj.value.points[moveLineAnchorIndex.value * 2 - 1] + moveObj.value.y) / 2
        moveObj.value.middlePoints[moveLineAnchorIndex.value].x = (moveObj.value.points[moveLineAnchorIndex.value * 2] + moveObj.value.x + moveObj.value.points[moveLineAnchorIndex.value * 2 + 2] + moveObj.value.x) / 2
        moveObj.value.middlePoints[moveLineAnchorIndex.value].y = (moveObj.value.points[moveLineAnchorIndex.value * 2 + 1] + moveObj.value.y + moveObj.value.points[moveLineAnchorIndex.value * 2 + 3] + moveObj.value.y) / 2
      // 最后端点时
      } else {
        moveObj.value.middlePoints[moveLineAnchorIndex.value - 1].x = (moveObj.value.points[moveLineAnchorIndex.value * 2] + moveObj.value.x + moveObj.value.points[moveLineAnchorIndex.value * 2 - 2] + moveObj.value.x) / 2
        moveObj.value.middlePoints[moveLineAnchorIndex.value - 1].y = (moveObj.value.points[moveLineAnchorIndex.value * 2 + 1] + moveObj.value.y + moveObj.value.points[moveLineAnchorIndex.value * 2 - 1] + moveObj.value.y) / 2
      }
      e.cancelBubble = true
    }
    /**
    * @desc 端点拖动结束
    */
    function dragendLineAnchor (e: any) {
      moveLineAnchorObj.value = {}
      e.cancelBubble = true
    }
    let moveLineMiddleObj = ref<any>({}) // 移动中的线条中点
    let moveLineMiddleIndex = ref(0) // 移动中的线条中点位置
    /**
    * @desc 中点拖动开始
    */
    function dragstartLineMiddle (item: any, index: number, lineObj: any) {
      moveLineMiddleObj.value = item
      moveLineMiddleIndex.value = index
      moveObj.value = lineObj
    }
    /**
    * @desc 中点拖动中
    */
    function dragmoveLineMiddle (e: any) {
      moveLineMiddleObj.value.y = e.target.attrs.y
      moveLineMiddleObj.value.x = e.target.attrs.x
      e.cancelBubble = true
    }
    /**
    * @desc 中点拖动结束
    */
    function dragendLineMiddle (e: any) {
      // 增加线条
      moveObj.value.points.splice(moveLineMiddleIndex.value * 2 + 2, 0, e.target.attrs.x - moveObj.value.x, e.target.attrs.y - moveObj.value.y)
      console.log(moveObj.value.points)
      // 增加端点
      moveObj.value.anchorPoints.splice(moveLineMiddleIndex.value + 1, 0, { x: e.target.attrs.x, y: e.target.attrs.y, category: 'line' })
      // 更新拖动中点位置
      moveLineMiddleObj.value.y = (moveObj.value.anchorPoints[moveLineMiddleIndex.value].y + moveObj.value.anchorPoints[moveLineMiddleIndex.value + 1].y) / 2
      moveLineMiddleObj.value.x = (moveObj.value.anchorPoints[moveLineMiddleIndex.value].x + moveObj.value.anchorPoints[moveLineMiddleIndex.value + 1].x) / 2
      // 增加中点
      moveObj.value.middlePoints.splice(moveLineMiddleIndex.value + 1, 0, {
        x: (moveObj.value.anchorPoints[moveLineMiddleIndex.value + 1].x + moveObj.value.anchorPoints[moveLineMiddleIndex.value + 2].x) / 2,
        y: (moveObj.value.anchorPoints[moveLineMiddleIndex.value + 1].y + moveObj.value.anchorPoints[moveLineMiddleIndex.value + 2].y) / 2,
        category: 'line'
      })
      moveLineMiddleObj.value = {}
      e.cancelBubble = true
    }
    let moveObj = ref<any>({}) // 移动中的组件
    /**
    * @desc 拖动开始
    */
    function dragstart (item: any, e: any) {
      console.log(e)
      moveObj.value = item
    }
    /**
    * @desc 拖动中
    */
    function dragmove (e: any) {
      console.log(e)
      if (moveObj.value.category === 'line') {
        // 拖动端点或中点时不更新线条组
        if (moveLineAnchorObj.value.category !== 'line' && moveLineMiddleObj.value.category !== 'line') {
          moveObj.value.group.y = e.target.attrs.y
          moveObj.value.group.x = e.target.attrs.x
        }
      } else {
        moveObj.value.y = e.target.attrs.y
        moveObj.value.x = e.target.attrs.x
      }
    }
    /**
    * @desc 拖动结束
    */
    function dragend (e: any) {
      console.log(e)
      // 多选情况
      if (transformerNodes.value.length > 1) {
        let obj = items.value.find(ele => ele.id === e.target.attrs.id)
        if (obj !== undefined) {
          if (obj.category === 'line') {
            // 拖动端点或中点时不更新线条组
            if (moveLineAnchorObj.value.category !== 'line' && moveLineMiddleObj.value.category !== 'line') {
              moveObj.value.group.y = e.target.attrs.y
              moveObj.value.group.x = e.target.attrs.x
            }
          } else {
            obj.y = e.target.attrs.y
            obj.x = e.target.attrs.x
          } 
        }
      } else {
        if (moveObj.value.category === 'line') {
          // 拖动端点或中点时不更新线条组
          if (moveLineAnchorObj.value.category !== 'line' && moveLineMiddleObj.value.category !== 'line') {
            moveObj.value.group.y = e.target.attrs.y
            moveObj.value.group.x = e.target.attrs.x
          }
        } else {
          moveObj.value.y = e.target.attrs.y
          moveObj.value.x = e.target.attrs.x
        }
      }
    }
    /**
    * @desc 变形中(可能有性能问题)(暂时和多选冲突)
    */
    function transform (e: any) {
      // console.log(e)
      if (['text', 'datetime'].includes(e.target.attrs.type) || ['value', 'simpleButton', 'button'].includes(e.target.attrs.category)) {
        // 修正旋转时，比例改变
        if (e.target.attrs.scaleX > 0.9999 && e.target.attrs.scaleX < 1.0001 && e.target.attrs.scaleY > 0.9999 && e.target.attrs.scaleY < 1.0001) {
          e.target.attrs.scaleX = 1
          e.target.attrs.scaleY = 1
        }
        // 只改变大小，不改变比例
        moveObj.value.width = moveObj.value.width * e.target.attrs.scaleX
        moveObj.value.height = moveObj.value.height * e.target.attrs.scaleY
        moveObj.value.scaleX = 1
        moveObj.value.scaleY = 1
      }
    }
    let transformerNodes = ref<Array<any>>([]) // 变形选中的组件数组
    /**
    * @desc 变形结束
    */
    function transformend (e: any) {
      console.log(e)
      // 多选情况
      if (transformerNodes.value.length > 1) {
        let obj = items.value.find(ele => ele.id === e.target.attrs.id)
        if (obj !== undefined) {
          obj.y = e.target.attrs.y
          obj.x = e.target.attrs.x
          obj.scaleX = e.target.attrs.scaleX
          obj.scaleY = e.target.attrs.scaleY
          obj.rotation = e.target.attrs.rotation
        }
      } else {
        moveObj.value.y = e.target.attrs.y
        moveObj.value.x = e.target.attrs.x
        moveObj.value.scaleX = e.target.attrs.scaleX
        moveObj.value.scaleY = e.target.attrs.scaleY
        /* moveObj.value.width = moveObj.value.width * e.target.attrs.scaleX
        moveObj.value.height = moveObj.value.height * e.target.attrs.scaleY */
        /* moveObj.value.scaleX = 1
        moveObj.value.scaleY = 1 */
        moveObj.value.rotation = e.target.attrs.rotation
        console.log(moveObj.value)
      }
    }
    // let transformerNode = ref<any | null>(null)
    let moveObjTarget = ref<any>() // 移动中的组件target
    /**
    * @desc 点击判断选中
    */
    function stageClick (e: any) {
      console.log(e)
      // 右键点击
      if (e.evt.button === 2) {
        return
      }
      // if we are selecting with rect, do nothing
      /* if (selectionRectangle.visible()) {
        return;
      } */
      let transformerNode = proxy.$refs.transformer.getNode()
      // console.log(transformerNode)
      // if click on empty area - remove all selections
      if (e.target === e.currentTarget) {
        transformerNode.nodes([])
        moveObj.value = {}
        transformerNodes.value = []
        return
      }
      // do we pressed shift or ctrl?
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey
      const isSelected = transformerNode.nodes().indexOf(e.target) >= 0

      if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        // 按钮需选中rect和text
        /* if (['simpleButton'].includes(e.target.attrs.category)) {
          let arr = proxy.$refs.layer.getNode().children
          let rectTemp = arr.find((ele: any) => ele.hasName('rect' + e.target.attrs.id))
          if (rectTemp !== undefined) {
            transformerNode.nodes([e.target, rectTemp])
          } else {
            transformerNode.nodes([e.target])
          } */
        if (['text', 'datetime'].includes(e.target.attrs.type) || ['waterBox', 'value', 'simpleButton', 'button'].includes(e.target.attrs.category)) {
          transformerNode.nodes([e.target.parent])
          moveObj.value = items.value.find(ele => ele.id === e.target.attrs.id)
          // 获取当前组件
          moveObjTarget.value = e.target.parent
          transformerNodes.value = [e.target.parent]
        } else if (['line'].includes(e.target.attrs.category) || e.target.attrs.type === 'pip-h') {
          // moveObj.value = items.value.find(ele => ele.id === e.target.attrs.id)
          // 获取当前组件
          moveObjTarget.value = e.target.parent
          transformerNodes.value = [e.target.parent]
          console.log(moveObj.value)
        } else {
          transformerNode.nodes([e.target])
          moveObj.value = items.value.find(ele => ele.id === e.target.attrs.id)
          // moveObj.value = e.target.attrs
          // 获取当前组件
          moveObjTarget.value = e.target
          transformerNodes.value = [e.target]
          // 设置状态条件数据
          if (['status'].includes(e.target.attrs.category)) {
            statusData.value = e.target.attrs.statusData
          }
        }
      } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = transformerNode.nodes().slice() // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1)
        transformerNode.nodes(nodes)
        transformerNodes.value = nodes
      } else if (metaPressed && !isSelected) {
        // add the node into selection
        let nodes = []
        if (['text', 'datetime'].includes(e.target.attrs.type) || ['waterBox', 'value', 'simpleButton', 'button'].includes(e.target.attrs.category)) {
          nodes = transformerNode.nodes().concat([e.target.parent])
        } else {
          nodes = transformerNode.nodes().concat([e.target])
        }
        transformerNode.nodes(nodes)
        transformerNodes.value = nodes
      }
      console.log(transformerNodes.value)
    }
    let contextmenuShow = ref(false) // 是否显示右键菜单
    let contextMenuItem = ref<any>({}) // 打开右键菜单的对象
    let contextMenuItemIndex = ref(0) // 打开右键菜单的对象对象位置
    let contextMenu = ref({ x: 0, y: 0 }) // 右键菜单
    /**
    * @desc 右键点击
    */
    function stageContextmenu (e: any) {
      console.log(e)
      e.evt.preventDefault()
      if (e.target === e.currentTarget) {
        return false
      }
      contextMenuItem.value = e.target.attrs
      contextMenuItemIndex.value = items.value.findIndex(ele => ele.id === contextMenuItem.value.id)
      contextMenu.value.x = e.evt.offsetX + 4
      contextMenu.value.y = e.evt.offsetY + 4
      contextmenuShow.value = true
    }
    /**
    * @desc 关闭右键菜单
    */
    function contextMenuClose () {
      contextmenuShow.value = false
      let transformerNode = proxy.$refs.transformer.getNode()
      transformerNode.nodes([])
    }
    /**
    * @desc 对象上移一层
    */
    function moveUp () {
      if (contextMenuItemIndex.value < items.value.length - 1) {
        [items.value[contextMenuItemIndex.value], items.value[contextMenuItemIndex.value + 1]] = [items.value[contextMenuItemIndex.value + 1], items.value[contextMenuItemIndex.value]]
      }
      contextMenuClose()
    }
    /**
    * @desc 对象下移一层
    */
    function moveDown () {
      if (contextMenuItemIndex.value > 0) {
        [items.value[contextMenuItemIndex.value], items.value[contextMenuItemIndex.value - 1]] = [items.value[contextMenuItemIndex.value - 1], items.value[contextMenuItemIndex.value]]
      }
      contextMenuClose()
    }
    /**
    * @desc 对象置于顶层
    */
    function moveTop () {
      items.value.splice(contextMenuItemIndex.value, 1)
      items.value.push(util.value.deepClone(contextMenuItem.value))
      contextMenuClose()
    }
    /**
    * @desc 对象置于底层
    */
    function moveBottom () {
      items.value.splice(contextMenuItemIndex.value, 1)
      items.value.unshift(util.value.deepClone(contextMenuItem.value))
      contextMenuClose()
    }
    /**
    * @desc 对象复制
    */
    function itemCopy () {
      let temp = util.value.deepClone(contextMenuItem.value)
      temp.id = new Date().getTime()
      temp.x = temp.x - 20
      temp.y = temp.y - 20
      items.value.push(temp)
      contextMenuClose()
    }
    /**
    * @desc 删除对象
    */
    function delItem () {
      items.value.splice(contextMenuItemIndex.value, 1)
      contextMenuClose()
      contextMenuItem.value = {}
      moveObj.value = {}
    }
    let rightShow = ref(true) // 右侧配置是否显示
    /**
    * @desc 切换显示右侧设置
    */
    function toggleRight () {
      rightShow.value = !rightShow.value
    }
    /**
    * @desc 更新当前组件
    */
    function refreshDraw () {
      // moveObjTarget.value.getLayer().batchDraw()
      moveObjTarget.value.draw()
    }
    let deviceList = ref([]) // 设备列表
    let deviceDataList = ref([]) // 设备数据列表
    /**
    * @desc 获取设备
    */
    function getDevice () {
      proxy.$api.get('commonRoot', '/mes/device/web/list', {}, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          deviceList.value = r.data.data
        }
      })
    }
    /**
    * @desc 选中设备
    */
    function selectDevice (val: string) {
      moveObj.value.dtuChildDataId = ''
      moveObj.value.dtuChildDataName = ''
      proxy.$api.get('commonRoot', '/mes/device/data/web/list', { deviceId: val }, (r: IInterfaceData) => {
        if (r.data.code === 0) {
          deviceDataList.value = r.data.data
        }
      })
    }
    /**
    * @desc 设备数据label
    */
    function renderDeviceDataLabel (option: SelectOption) {
      let temp = ''
      if (!util.value.isEmpty(option.dataName)) {
        temp = typeof(option.dataName) === 'string' ? option.dataName : ''
        if (option.dataNote !== null) {
          temp += '(' + option.dataNote + ')'
        }
      }
      return h('div', temp)
    }
    /**
    * @desc 选中设备数据
    */
    function selectDeviceData (val: string, option: SelectOption) {
      moveObj.value.dtuChildDataId = option.dtuChildDataId
      moveObj.value.dtuChildDataName = option.dtuChildDataName
    }
    type StatusRowData = {
      greater: string
      less: string
      color: string
    }
    // 状态条件表头
    const statusColumns = ref([
      {
        title: '>=',
        key: 'greater',
        align: 'center',
        render (row: StatusRowData, index: number) {
          return h(NInput, {
            value: row.greater,
            onUpdateValue (v) {
              statusData.value[index].greater = v
            }
          })
        }
      },
      {
        title: '<=',
        key: 'less',
        align: 'center',
        render (row: StatusRowData, index: number) {
          return h(NInput, {
            value: row.less,
            onUpdateValue (v) {
              statusData.value[index].less = v
            }
          })
        }
      },
      {
        title: '颜色',
        key: 'color',
        width: '80px',
        align: 'center',
        render (row: StatusRowData, index: number) {
          return h(NColorPicker, {
            value: row.color,
            onUpdateValue (v) {
              statusData.value[index].color = v
            }
          })
        }
      },
      {
        title: '操作',
        key: 'action',
        width: '60px',
        align: 'center',
        render (row: StatusRowData, index: number) {
          return h('div', [
            h('a', {
              href: 'javascript:void(0)',
              class: 'del',
              onClick: () => statusData.value.splice(index, 1)
            }, '删除')
          ])
        }
      }
    ])
    let statusData = ref<StatusRowData[]>([])// 状态条件数据
    /**
    * @desc 新增状态条件数据
    */
    function addStatusData () {
      statusData.value.push({ greater: '', less: '', color: '' })
    }
    /**
    * @desc 背景图片上传
    */
    function upBackSuccess (obj: IUploadResData) {
      basicSettings.value.ossId = obj.ossId
      basicSettings.value.fileName = obj.fileName
      basicSettings.value.relativePath = obj.relativePath
    }
    /**
    * @desc 保存组态
    */
    function saveConfig () {
      console.log(items.value)
      let obj = { basicSettings: basicSettings.value, items: items.value }
      let jsonStr = JSON.stringify(obj)
      proxy.$myLoading.show()
      if (method.value === 'add') {
        let temp = util.value.getDate(18)
        proxy.$api.post('commonRoot', '/v2/apps/graphics/insert', { title: basicSettings.value.name, coverChart: 'aaa', graphicsJson: jsonStr, publishingLogo: 0, addDate: temp, addPople: 'admin' }, (r: any) => {
          if (r.data.status) {
            proxy.$myMessage.success('新增成功')
            proxy.$emit('save-success', true)
          } else {
            proxy.$myMessage.error1('新增失败')
          }
          proxy.$myLoading.close()
        })
      } else if (method.value === 'edit') {
        proxy.$api.post('commonRoot', '/v2/apps/graphics/updateGraphics', { id: id.value, title: basicSettings.value.name, coverChart: basicSettings.value.cover, graphicsJson: jsonStr }, (r: any) => {
          if (r.data.status) {
            proxy.$myMessage.success('修改成功')
            proxy.$emit('save-success', false)
          } else {
            proxy.$myMessage.error1('修改失败')
          }
          proxy.$myLoading.close()
        })
      }
    }
    function closeConfig () {
      proxy.$emit('close')
    }
    function viewConfig () {
      let routeUrl = proxy.$router.resolve({
        path: 'viewConfig/' + id.value
      })
      window.open(routeUrl.href)
    }
    return { util, uploadRoot, commonItems, chartItems, svgItems, imgItems, canvasItems, switchs, svgItemsTypeTitle, curItemListType, itemListShow,
      deviceItemTypeShow, fontFamilys,
      init, setCurItemListType, toggleDeviceItemType, setSvgItems, dragstartLeft, drop, items,
      configImg, configLabel, configTag, configText, configDatetime, configWeather, configDeviceImg, configWaterBoxGroup,
      configWaterBoxBack, configWaterBoxWater, configWaterBoxLine,
      configValue, configEcharts, liquidfillShapeList, configStatus, configSimpleButtonText, configButtunTag,
      configLineGroup, configLine, configLinePipe, configLineAnchor, configLineMiddle,
      dragstartLineAnchor, dragmoveLineAnchor, dragendLineAnchor, dragstartLineMiddle, dragmoveLineMiddle, dragendLineMiddle,
      moveObj, dragstart, dragmove, dragend, transform, transformend, stageClick,
      contextmenuShow, contextMenuItem, contextMenuItemIndex, contextMenu, stageContextmenu, contextMenuClose, moveUp, moveDown, moveTop, moveBottom, itemCopy, delItem,
      rightShow, toggleRight, refreshDraw,
      deviceList, deviceDataList, selectDevice, renderDeviceDataLabel, selectDeviceData, statusColumns, statusData, addStatusData,
      basicSettings, getBasicStyle, upBackSuccess,
      saveConfig, closeConfig, viewConfig }
  }
}
</script>
<style lang="scss">
@import "../../style/configuration";
</style>