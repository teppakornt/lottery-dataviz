
//FALSE	1087	2017-04-01 09:58:01 UTC	2017-08-14 21:52:36 UTC	5094727	4686.961361545538	179192	6	 
//TRUE	144	2017-04-01 09:41:03 UTC	2017-08-13 16:13:26 UTC	1823339	12662.076388888889	102586	0	

import _ from 'lodash'
export const SUMMARY_FACEBOOK = [
    {mark:"FALSE", num_post:1087, min_time:"1.491040681E9",max_time:"1.502747556E9",sum_eng:5094727,avg_eng:4686.961361545538,max_eng:179192,min_eng:6},
    {mark:"TRUE", num_post:144, min_time:"1.491039663E9",max_time:"1.502640806E9",sum_eng:1823339,avg_eng:12662.076388888889,max_eng:102586,min_eng:0}
]
export const FACEBOOK_POST = [
   {mark:"TRUE", bin:16, CNT:1}
,   {mark:"TRUE", bin:18, CNT:1}
,   {mark:"TRUE", bin:51, CNT:1}
,   {mark:"TRUE", bin:15, CNT:1}
,   {mark:"TRUE", bin:11, CNT:1}
,   {mark:"TRUE", bin:12, CNT:1}
,   {mark:"TRUE", bin:19, CNT:1}
,   {mark:"TRUE", bin:23, CNT:1}
,   {mark:"TRUE", bin:38, CNT:1}
,   {mark:"TRUE", bin:27, CNT:2}
,   {mark:"TRUE", bin:41, CNT:2}
,   {mark:"TRUE", bin:21, CNT:2}
,   {mark:"TRUE", bin:14, CNT:2}
,   {mark:"TRUE", bin:10, CNT:3}
,   {mark:"TRUE", bin:13, CNT:3}
,   {mark:"TRUE", bin:7, CNT:3}
,   {mark:"TRUE", bin:17, CNT:3}
,   {mark:"TRUE", bin:8, CNT:4}
,   {mark:"TRUE", bin:9, CNT:4}
,   {mark:"TRUE", bin:6, CNT:5}
,   {mark:"TRUE", bin:5, CNT:6}
,   {mark:"TRUE", bin:4, CNT:12}
,   {mark:"TRUE", bin:0, CNT:19}
,   {mark:"TRUE", bin:3, CNT:19}
,   {mark:"TRUE", bin:2, CNT:20}
,   {mark:"TRUE", bin:1, CNT:26}
,   {mark:"FALSE", bin:89, CNT:1}
,   {mark:"FALSE", bin:56, CNT:1}
,   {mark:"FALSE", bin:60, CNT:1}
,   {mark:"FALSE", bin:21, CNT:1}
,   {mark:"FALSE", bin:49, CNT:1}
,   {mark:"FALSE", bin:19, CNT:1}
,   {mark:"FALSE", bin:17, CNT:1}
,   {mark:"FALSE", bin:23, CNT:1}
,   {mark:"FALSE", bin:66, CNT:1}
,   {mark:"FALSE", bin:36, CNT:2}
,   {mark:"FALSE", bin:35, CNT:2}
,   {mark:"FALSE", bin:41, CNT:2}
,   {mark:"FALSE", bin:27, CNT:2}
,   {mark:"FALSE", bin:20, CNT:2}
,   {mark:"FALSE", bin:13, CNT:3}
,   {mark:"FALSE", bin:18, CNT:3}
,   {mark:"FALSE", bin:14, CNT:3}
,   {mark:"FALSE", bin:15, CNT:4}
,   {mark:"FALSE", bin:12, CNT:4}
,   {mark:"FALSE", bin:8, CNT:5}
,   {mark:"FALSE", bin:16, CNT:6}
,   {mark:"FALSE", bin:11, CNT:8}
,   {mark:"FALSE", bin:9, CNT:9}
,   {mark:"FALSE", bin:7, CNT:10}
,   {mark:"FALSE", bin:10, CNT:13}
,   {mark:"FALSE", bin:6, CNT:15}
,   {mark:"FALSE", bin:5, CNT:20}
,   {mark:"FALSE", bin:4, CNT:25}
,   {mark:"FALSE", bin:3, CNT:30}
,   {mark:"FALSE", bin:2, CNT:75}
,   {mark:"FALSE", bin:1, CNT:135}
,   {mark:"FALSE", bin:0, CNT:700}
]

const prepare = (postGroup) => {
    let post1 = []
    for(let i=0;i<=20;++i){
        post1.push({
            bin: i,
            CNT: 0
        })
    }
    for(let ix=0; ix<=postGroup.length; ++ix){
        if(!postGroup[ix] || !post1[postGroup[ix].bin]) continue
        post1[postGroup[ix].bin].CNT = postGroup[ix].CNT
    }
    return post1
}
export const facebookPostProcessData = () => {
    let post = FACEBOOK_POST.filter( x => x.bin <= 40)
    let postGroup = _.values(_.groupBy(post, x => x.mark))
    let result = []
    result.push({ values: prepare(postGroup[0]), mark:postGroup[0][0].mark})
    result.push({ values: prepare(postGroup[1]), mark:postGroup[1][0].mark})

    return result
}