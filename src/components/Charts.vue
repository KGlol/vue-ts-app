<template>
  <div ref="myChart" class="chart" :style="{width: chartWidth, height: chartHeight}">
    图表
  </div>
</template>

<script lang="ts">
import {Component, Provide, Prop, Vue} from 'vue-property-decorator'
import echarts from 'echarts'

@Component({
  components: {}
}) 

export default class Charts extends Vue{
  // 定义chartType的默认类型和默认值
  @Prop(Object) chartData!: object | null
  @Prop({type: String, default: 'line'}) readonly chartType!: string

  @Provide() chartWidth: string = ''
  @Provide() chartHeight: string = ''

  created() {
    this.generatorWidthAndHeihgt()
  }

  mounted() {
    this.drawChart()
    console.log('渲染了图表');
  }

  generatorWidthAndHeihgt() {
    this.chartWidth = `${document.body.offsetWidth * .8}px`
    this.chartHeight = `${document.body.offsetHeight * .6}px`
  }

  drawChart() {
    // 1.实例化echarts对象
    const chart = echarts.init(((this as any).$refs.myChart as HTMLCanvasElement))

    if(chart == undefined) console.log(`echarts init dom is failed`);

    switch(this.chartType) {
      case 'line':
        chart.setOption((this as any).generatorLineOption())
        break
      case 'bar':
        chart.setOption((this as any).generatorBarOption())
        break
      case 'pie':
        chart.setOption((this as any).generatorPieOption())
        break
      default: 
        console.log(`chartType ${this.chartType} is invalid`);
        break
    }
  }

  generatorLineOption() {
    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      xAxis: {
        type: "category",
        data: (this as any).chartData.xAxisData
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: (this as any).chartData.yAxisData,
          type: "line",
          smooth: true
        }
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      }
    }
  }
  generatorBarOption() {
    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      xAxis: {
        type: "category",
        data: (this as any).chartData.xAxisData
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: (this as any).chartData.yAxisData,
          type: "bar",
          barWidth: "20%"
        }
      ],
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "5%"
      }
    };
  }

  generatorPieOption() {
    // 处理数据
    let pieData = [];
    for (const index in (this as any).chartData.xAxisData) {
      pieData.push({
        value: (this as any).chartData.yAxisData[index],
        name: (this as any).chartData.xAxisData[index]
      });
    }

    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: (this as any).chartData.xAxisData
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: pieData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }
  
}
</script>