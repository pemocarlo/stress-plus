import React from 'react'
import './level-bar.css'

export default function Levelbar(props){
    return (
        <div className='Levelbar'>
            <div className='row'>
                <div className='triangle_down' style={{'margin-left': `${props.average_score}%`}}>
                    <span>Average</span>
                    <div className='triangle'></div>
                </div>
            </div>
            <div className='row'>
                <div className='meter_red'></div>
                <div className='meter_yellow'></div>
                <div className='meter_green'></div>
            </div>
            <div className='row'>
            <div className='triangle_up' style={{'margin-left': `${props.your_score}%`}}>
                <div className='triangle'></div>
                <span>You</span></div>
            </div>
            
        </div>
    )
}
