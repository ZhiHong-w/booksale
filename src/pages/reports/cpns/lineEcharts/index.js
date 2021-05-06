/**
 * 数据统计，运用类组件
 */
import React, { PureComponent } from 'react';

import { PaintWrapper } from './style';
//import { connect } from 'react-redux';
import * as echarts from 'echarts';
//import _ from 'lodash';

import { 
    webSearchOption, 
    webLocationOption,
    bookDaySaleOption,
    bookCateSaleOption
 } from '../../../../common/report-data';
//import { getLineEchartsDispatch } from '../../store/actionCreators';

class LineEcharts extends PureComponent {

    componentDidMount() {
        //this.props.getLineEchartsData();
        // let myChart = echarts.init(document.getElementById('lineEcharts'));
        // myChart.setOption(_.merge(this.props.lineEcharts,lineEchartsOption));
        let myChart01 = echarts.init(document.getElementById('lineEcharts01'));
        myChart01.setOption(webSearchOption);

        let myChart02 = echarts.init(document.getElementById('lineEcharts02'));
        myChart02.setOption(webLocationOption);

        let myChart03 = echarts.init(document.getElementById('lineEcharts03'));
        myChart03.setOption(bookDaySaleOption);

        let myChart04 = echarts.init(document.getElementById('lineEcharts04'));
        myChart04.setOption(bookCateSaleOption);
    }
    // componentDidUpdate(){
    //     //let myChart = echarts.init(document.getElementById('lineEcharts'));
    //     //myChart.setOption(_.merge(this.props.lineEcharts,lineEchartsOption));

    // }

    render() {
        return (
            <PaintWrapper>
                <h1>站点访问统计：</h1>
                <div className="web">
                    <div id="lineEcharts01" style={{ width: "550px", height: "400px" }}></div>
                    <div id="lineEcharts02" style={{ width: "550px", height: "400px" }}></div>
                </div>
                <h1>销量统计：</h1>
                <div className="web">
                    <div id="lineEcharts03" style={{ width: "550px", height: "400px" }}></div>
                    <div id="lineEcharts04" style={{ width: "550px", height: "400px" }}></div>
                </div>
            </PaintWrapper>
        )
    }
}

//react-redux中connect的用法
// const mapStateToProps = state => ({
//     lineEcharts: state.report.lineEcharts
// });
// const mapDispatchToProps = dispatch => ({
//     getLineEchartsData: function(){
//         dispatch(getLineEchartsDispatch())
//     }
// })

// export default connect(mapStateToProps,mapDispatchToProps)(LineEcharts);

export default LineEcharts


