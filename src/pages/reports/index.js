import React from 'react';
import { Card } from 'antd';

import { ReportsWrapper } from './style';

import Breadcrus from '../../components/breadcrumb';
import { breadReports } from '../../common/bread-data';

import LineEcharts from './cpns/lineEcharts';


export default function Reports() {
    return (
        <ReportsWrapper>
            <Breadcrus breadData={breadReports}></Breadcrus>
            <Card>
                <LineEcharts />
            </Card>
        </ReportsWrapper>
    )
}
