import React from 'react'

const WeekdropdownEnd = (props)=>{
    let weeks = [];
    for (let i = 1; i < 53; i++ ){
        weeks.push(<li key={i} onClick={props.changeWeekEnd} data-week-end={i}>{i}</li>)   
    }
    return weeks;      
}

export default WeekdropdownEnd;