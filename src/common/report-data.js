// export const lineEchartsOption = {
//   title: {
//     text: '用户来源'
//   },
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'cross',
//       label: {
//         backgroundColor: '#E9EEF3'
//       }
//     }
//   },
//   grid: {
//     left: '3%',
//     right: '4%',
//     bottom: '3%',
//     containLabel: true
//   },
//   xAxis: [
//     {
//       boundaryGap: false
//     }
//   ],
//   yAxis: [
//     {
//       type: 'value'
//     }
//   ]
// }

export const webSearchOption = {
  title: {
    text: '站点访问量'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['站点访问']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '站点访问',
      type: 'line',
      stack: '总量',
      data: [1200, 3320, 3010, 3340, 3900, 3300, 3200]
    }
  ]

}

export const webLocationOption = {
  title: {
    text: '站点用户访问来源',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 5048, name: '搜索引擎' },
        { value: 4350, name: '直接访问' },
        { value: 4840, name: '图书APP' },
        { value: 3000, name: '信息推送' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

export const bookDaySaleOption = {
  title: {
    text: '图书销量(册)'
  },
  tooltip: {},
  legend: {
    data: ['日销量（册）']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [1000, 500, 3000, 800, 1200, 3423, 2300]
  }]
}

export const bookCateSaleOption = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  series: [
    {
      name: '月销量（册）',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 10048, name: '文学类' },
        { value: 4735, name: '社科类' },
        { value: 8580, name: '文教类' },
        { value: 9000, name: '生活类' },
      ]
    }
  ]
}