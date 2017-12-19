import * as d3 from 'd3'
import _ from 'lodash'


import { NEWS_CODE } from '../utils'


//const URL_PATH = 'https://storage.googleapis.com/lottery-datavis/detail_heatmap.csv'
//const URL_PATH = './data/detail_heatmap_with_num_clean.csv'
const URL_PATH = './data/detail_heatmap_with_num_clean_tag.csv'
const parseTime = d3.timeParse("%d/%m/%Y %H:%M");
const isNumeric = (value) => {
    return /^\d+$/.test(value);
}
const getDigit = (value, col='num2') => {
    let digit = value.map(x=>x[col])
    digit = ' '+digit.join(' ')+' '
    digit = digit.replace(' 0 ',' ')
    digit = digit.replace(',',' ')
    digit = digit.replace('\n',' ')
    let sp = digit.split(' ')
    sp = _.uniq(sp)
    sp = sp.filter(x => isNumeric(x) && x.length === 2)
    return sp
}


const calAccuracyProvince = (accuracy_num2_pro, province, all_lot_date) => {
    //Province Accuracy
    let result = []
    for(let i=0;i<province.length;++i){
        let acc = []
        let lot_won2 = 0
        let lot_try = 0
        let lot_num2 = []
        for(let j=0;j<all_lot_date.length;++j){
            let won2 = accuracy_num2_pro[i][j].won2
            let num2 = _.uniq(accuracy_num2_pro[i][j].num2)
            lot_num2.push(!num2 ? 0 : num2.length)
            if(!num2 || num2.length === 0)
                continue
            lot_try += 1
            if(won2){
                acc.push(1.00/(num2.length*1.00))
                lot_won2 += 1
            }
            else
                acc.push(0)
        }
        if(acc.length === 0 ){
            result.push({
                province:province[i],
                lot_num2: lot_num2,
                accuracy: 0,
                lot_won2: 0,
                lot_try: 0,
            })
        }
        else{
            let avg = _.mean(acc)

            result.push({
                province:province[i],
                accuracy: avg,
                lot_won2: lot_won2,
                lot_num2: lot_num2,
                lot_try: lot_try,
            })
        }
    }
    /*result = _.orderBy(result,['accuracy'],['desc'])
    result = result.slice(0,5)*/
    return result
}

const calLotWin = (pro_won2_lot_date, province, all_lot_date) => {
    let result = []
    for(let i=0;i<province.length;++i){
        let count = 0;
        for(let j=0;j<all_lot_date.length;++j){
            if(pro_won2_lot_date[i][j] > 0)
                count += 1
        }
        result.push(count)
    }
    return result
}

const ProcessProvince = (data, all_lot_date) => {
    //const province = _.sortBy(_.uniq(data.map( x => x.province )))
    const group_news = _.values(_.groupBy(data, (x)=>x.news))
    let group_province = _.values(_.groupBy(data, (x)=>x.province))
    group_province = _.orderBy(group_province, ['length'])
    const province = group_province.map( x => x[0].province)
    let result = [null,null,null,null]
    let won_province = _.range(0,province.length).map( x => false )
    let value_lot_date = _.range(0,all_lot_date.length).map( x => 0 )
    let pro_won2_value_lot_date = _.range(0,all_lot_date.length).map( x => 0 )


    
    //Accuracy
    let accuracy_num2_news_pro = [_.range(0,province.length).map( y => _.range(0,all_lot_date.length).map( x => ({won2: false, num2:[]}) )),
    _.range(0,province.length).map( y => _.range(0,all_lot_date.length).map( x => ({won2: false, num2:[]}) )),
    _.range(0,province.length).map( y => _.range(0,all_lot_date.length).map( x => ({won2: false, num2:[]}) )),
    _.range(0,province.length).map( y => _.range(0,all_lot_date.length).map( x => ({won2: false, num2:[]}) ))]

    let accuracy_num2_pro = _.range(0,province.length).map( y => _.range(0,all_lot_date.length).map( x => ({won2: false, num2:[]}) ))


    group_news.forEach( news => {
        let news_name = news[0].news
        let news_index = NEWS_CODE.indexOf(news_name)

        let pro_values = _.range(0,province.length).map( x => 0 )
        let pro_won2 =  _.range(0,province.length).map( x => 0 )
        let pro_detail =  _.range(0,province.length).map( x => [] )
        let pro_lot_date =  _.range(0,province.length).map( y => _.range(0,all_lot_date.length).map( x => 0 ))
        let pro_won2_lot_date = _.range(0,province.length).map( y => _.range(0,all_lot_date.length).map( x => 0 ))
        
        const string_lot_date = all_lot_date.map( x => x.toString())

        news.forEach( post => {

            if(post.province){
                let index_pro = province.indexOf(post.province)
                pro_values[index_pro] += 1
                pro_detail[index_pro].push(post)

                let index_lot_date = string_lot_date.indexOf(parseTime(post.lot_date).toString())
                pro_lot_date[index_pro][index_lot_date] += 1
                value_lot_date[index_lot_date] += 1

                let tmp_num2 = getDigit([post])
                accuracy_num2_news_pro[news_index][index_pro][index_lot_date].num2 = accuracy_num2_news_pro[news_index][index_pro][index_lot_date].num2.concat(tmp_num2)
                accuracy_num2_pro[index_pro][index_lot_date].num2 = accuracy_num2_pro[index_pro][index_lot_date].num2.concat(tmp_num2)
                if(post.num2 && post.d2Prize){
                    const won2 = post.num2.indexOf(post.d2Prize) >= 0

                    if(won2){
                        accuracy_num2_news_pro[news_index][index_pro][index_lot_date].won2 |= true
                        accuracy_num2_pro[index_pro][index_lot_date].won2 |= true
                        pro_won2[index_pro] += 1
                        won_province[index_pro] = 1
                        pro_won2_lot_date[index_pro][index_lot_date] = 1
                        pro_won2_value_lot_date[index_lot_date] += 1
                    }
                }
            }
        })

        pro_won2 = calLotWin(pro_won2_lot_date, province, all_lot_date)
        console.log('pro_won2', pro_won2)
        result[news_index] = {
            news: news_name,
            province_count: pro_values,
            province_detail: pro_detail,
            province_lot_date: pro_lot_date,
            province_won2: pro_won2,
            province_won2_lot_date: pro_won2_lot_date
        }
    })

    let num_lot_won = accuracy_num2_pro.map( x => {
        let sum = 0
        x.forEach( y => {
            if(y.won2) sum += 1
        })
        return sum
    })

    won_province = province.filter((x,index)=>won_province[index]>0)
    //console.log('xxxxxxxxxxxxxxx', accuracy_num2_pro)
    let accuracy_won2_pro = calAccuracyProvince(accuracy_num2_pro, province, all_lot_date)
    let accuracy_won2_news_pro = NEWS_CODE.map((x,i)=>calAccuracyProvince(accuracy_num2_news_pro[i], province, all_lot_date))
    

    //console.log('accuracy_won2_pro', accuracy_won2_pro, accuracy_won2_news_pro)
    return { values: result, 
        num_lot_won: num_lot_won,
        province: province, 
        won_province: won_province, 
        lot_date: all_lot_date, 
        base_value_lot_date: value_lot_date, 
        base_won2: pro_won2_value_lot_date,
        accuracy:{
            won2_pro: accuracy_won2_pro,
            won2_news_pro: accuracy_won2_news_pro
        } 
    }
}



const ProcessTag = (data, all_lot_date) => {
    //const group_news = _.values(_.groupBy(data, (x)=>x.news))
    //Preprocess Tag
    let master_tags = []
    for(let i=0;i<data.length;++i){
        let tag = data[i].final_tag
        data[i].tags = []
        data[i].won2 = false
        if(!tag || tag.length === 0)
            continue

        
        let sp = tag.split(', ')
        sp = sp.filter(x => x.length > 0)
        sp = _.uniq(sp)
        master_tags = master_tags.concat(sp)
        data[i].tags = sp
        
        if(data[i].num2 && data[i].d2Prize){
            const won2 = data[i].num2.indexOf(data[i].d2Prize) >= 0
            data[i].won2 = won2
        }
    }
    master_tags = _.uniq(master_tags)

    let tag_news = NEWS_CODE.map((x,i)=>(
        {news: x, 
            tags: master_tags.map(y => (
                {
                    tag:y, 
                    detail: [],
                    news_count: 0, 
                    lot_won: 0,
                    list_lot_won: [],
                    accuracy: 0,
                    news_overtime: all_lot_date.map(xx => 0), 
                    base_news_overtime: all_lot_date.map(xx => 0),
                    won_overtime: all_lot_date.map(xx => 0), 
                    num2_overtime: all_lot_date.map(xx => []),
                    all_lot_date: all_lot_date
                }
            ))
        }
    ))

    let tags_all_news = JSON.parse(JSON.stringify(tag_news[0]))
    
    const string_lot_date = all_lot_date.map( x => x.toString())

    let base_news_overtime = all_lot_date.map(xx => 0)
    
    for(let i=0; i<data.length;++i){
        let news_index = NEWS_CODE.indexOf(data[i].news)
        let tags = data[i].tags
        let lot_date = parseTime(data[i].lot_date).toString()
        let lot_date_index = string_lot_date.indexOf(lot_date)
        let num2 = getDigit([data[i]])

        base_news_overtime[lot_date_index] += 1
        for(let j=0; j<tags.length;++j){
            let tag_index = master_tags.indexOf(tags[j])
            //NEWS_COUNT
            let tagData = tag_news[news_index].tags[tag_index]
            let tagAllData = tags_all_news.tags[tag_index]

            try{
                tagData.news_count += 1
                tagAllData.news_count += 1
            }catch(e){
                debugger;
            }

            //LOT_COUNT
            if(data[i].num2 && data[i].d2Prize){
                const won2 = data[i].num2.indexOf(data[i].d2Prize) >= 0
                if(won2){
                    tagData.list_lot_won.push(lot_date)
                    tagAllData.list_lot_won.push(lot_date)
                    //WON_OVERTIME
                    tagData.won_overtime[lot_date_index] += 1
                    tagAllData.won_overtime[lot_date_index] += 1
                }
            }
            //NEWS_OVERTIME
            tagData.news_overtime[lot_date_index] += 1
            tagAllData.news_overtime[lot_date_index] += 1
            //num2_overtime
            if(num2 && num2.length>0){
                tagData.num2_overtime[lot_date_index] = tagData.num2_overtime[lot_date_index].concat(num2)
                tagAllData.num2_overtime[lot_date_index] = tagAllData.num2_overtime[lot_date_index].concat(num2)
            }
            //DETAIL
            tagData.detail.push(data[i])
            tagAllData.detail.push(data[i])
        }
        //tag_news[news_index] =
    }
    //RECALCULATE
    for(let i=0; i<tag_news.length+1; ++i){
        for(let j=0; j<master_tags.length;++j){
            let tagData = i>=tag_news.length ? tags_all_news.tags[j] : tag_news[i].tags[j]
            
            //TAGS_WON
            tagData.list_lot_won = _.uniq(tagData.list_lot_won)
            tagData.lot_won = tagData.list_lot_won.length

            //ACCURACY
            let acc = 0
            let list_accuracy = []
            for(let k=0; k<all_lot_date.length;++k){
                let sp = tagData.num2_overtime[k]
                if(sp.length>0){
                    if(tagData.won_overtime[k] > 0)
                        list_accuracy.push(1.00/(sp.length*1.00))
                    else
                        list_accuracy.push(0)
                }
            }
            if(list_accuracy.length > 0)
                acc = _.mean(list_accuracy)
            
            tagData.accuracy = acc
            tagData.detail = _.orderBy(tagData.detail,['nbtime'])
            tagData.base_news_overtime = base_news_overtime
            // tagData.num2_overtime.map( x => {

            // })
            //tagData.accuracy = 
        }
    }
    
    console.log('tags_all_news', tag_news, tags_all_news)
    return {
        tag_data: [tags_all_news, ...tag_news]
    }
}

export const loadDATA = () => {
    return new Promise((resolve,reject) => {
         d3.csv(URL_PATH, (error, data) => {
            if (error) return reject(error)
            let dataset = []
            try{
                // Process Data
                let news_data = _.groupBy(data, (x)=>x.news+"#"+x.lot_date)
                news_data = _.values(news_data)
                news_data = news_data.map((value) => { 
                    // let won2 = value.filter( x => x.won2 === 'TRUE' )
                    // won2 = won2 && won2.length >= 1 ? true : false;
                    let num2 = getDigit(value)
                    const won2 = num2.indexOf(value[0].d2Prize) >= 0
                    return { 
                        news: value[0].news, 
                        lot_date: parseTime(value[0].lot_date),
                        won2: won2,
                        num2: num2,
                        len_num2: num2.length,
                        percent_won2: !num2 || num2.length === 0 ? 0 : won2*1.0 / num2.length,
                        detail: value,
                        d2Prize: value[0].d2Prize,
                    }
                })
                news_data = _.orderBy(news_data, ['lot_date','news'])


                news_data = _.values(_.groupBy(news_data, (x)=>x.lot_date))
                news_data = news_data.map((x)=>{
                    let values = []
                    for(let i=0;i<NEWS_CODE.length;++i){
                        let tmp = {
                            news: NEWS_CODE[i],
                            lot_date: x[0].lot_date,
                            won2: false,
                            num2: [],
                            len_num2: 0,
                            percent_won2: 0,
                            detail: [],
                            d2Prize: x[0].d2Prize,
                        }
                        for(let j=0;j<x.length;++j){
                            if(x[j] && NEWS_CODE[i] === x[j].news){ 
                                tmp = x[j]
                                break
                            }
                        }
                        values.push(tmp)
                    }


                    
                    return {
                        lot_date: x[0].lot_date,
                        values: values,
                    }
                })
                let win_count = {
                    'khaosod':{ percent_won2:[], count_won2: 0, name: 'khaosod' },
                    'thairath':{ percent_won2:[], count_won2: 0, name: 'thairath' },
                    'matichon':{ percent_won2:[], count_won2: 0, name: 'matichon' },
                    'manager':{ percent_won2:[], count_won2: 0, name: 'manager' },
                }
                news_data.forEach( x => {
                    x.values.forEach( y => {
                        win_count[y.news].percent_won2.push(y.percent_won2)
                        if(y.won2){
                            win_count[y.news].count_won2 += 1
                        }
                    })
                })
                win_count = _.values(win_count)
                win_count = win_count.map( x => ({
                    ...x,
                    percent_won2: Math.round(_.mean(x.percent_won2)*100000)/1000
                }))
                //Process Province
                const all_lot_date = news_data.map( x => x.lot_date)
                const province_data = ProcessProvince(data, all_lot_date)
                const tag_data = ProcessTag(data, all_lot_date)
                //console.log('province_data', province_data)
                dataset = { news_data, win_count, province_data, tag_data }
            }catch(e){
                return reject(e)
            }
            return resolve(dataset)
        });
    });
}