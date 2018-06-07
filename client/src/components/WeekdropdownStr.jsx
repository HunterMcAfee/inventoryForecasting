import React from 'react'

const WeekdropdownStr = (props)=>{
    let weeks = [];
    for (let i = 1; i < 53; i++ ){
        weeks.push(<li key={i} onClick={props.changeWeekStart} data-week-start={i}>{i}</li>)   
    }
    return weeks;      
}

export default WeekdropdownStr;