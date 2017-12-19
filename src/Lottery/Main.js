import React from 'react';

import { MainHeatmap } from './Heatmap/MainHeatmap'
import { TimeLineNews } from './TimeLine/TimeLineNews'
import { FirstPage } from './FirstPage/FirstPage'
import { Nayok } from './Nayok/Nayok'
import { LotteryIntro } from './LotteryIntro/LotteryIntro'
import { LastPage } from './LastPage/LastPage'

export const Main = () => {
    return (
    <div>
        <FirstPage/>
        <LotteryIntro/>
        <Nayok/>
        <TimeLineNews/>
        <MainHeatmap/>
        <LastPage/>
    </div>)
}