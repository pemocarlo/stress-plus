import React from 'react'
import './Levelbar.css'

function Levelbar(){
    return (
        <div>
            <div class='triangle_down'><span>Average</span></div>
            <div class='meter_red'></div>
            <div class='meter_yellow'></div>
            <div class='meter_green'></div>
            <div class='triangle_up'><span>You</span></div>
            <div className="button">
                <button name="YES" onClick={correct}>Correct</button>
                <button name="NO" onClick={incorrect}>Incorrect</button>
            </div>
        </div>
    )

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
    }

function correct() {
    console.log('Correct Answer')
    var average_current = getComputedStyle(document.documentElement).getPropertyValue('--average_percentage');
    var your_current = getComputedStyle(document.documentElement).getPropertyValue('--your_percentage');
    
    /*change the arguements to getRandomArbitrary to change the fluctuations for each question in the avg score*/
    var average_new = parseInt(average_current, 10) + getRandomArbitrary(-2,4);
    if (average_new > 100){
        average_new = 100
    }
    else if (average_new < 0){
        average_new = 0
    }
    /*change this value to change the increase score for each correct answer*/
    var your_new = parseInt(your_current, 10) + 2;
    if (your_new > 100){
        your_new = 100
    }
    else if (your_new < 0){
        your_new = 0
    }
    document.documentElement.style.setProperty("--average_percentage", average_new);
    document.documentElement.style.setProperty("--your_percentage", your_new);
}

function incorrect(){
    console.log('Wrong Answer')
    var average_current = getComputedStyle(document.documentElement).getPropertyValue('--average_percentage');
    var your_current = getComputedStyle(document.documentElement).getPropertyValue('--your_percentage');
    
    /*change the arguements to getRandomArbitrary to change the fluctuations for each question in the avg score*/
    var average_new = parseInt(average_current, 10) + getRandomArbitrary(-2,4);
    if (average_new > 100){
        average_new = 100
    }
    else if (average_new < 0){
        average_new = 0
    }
    /*change this value to change the decrease score for each incorrect answer*/
    var your_new = parseInt(your_current, 10) - 5;
    if (your_new > 100){
        your_new = 100
    }
    else if (your_new < 0){
        your_new = 0
    }
    document.documentElement.style.setProperty("--average_percentage", average_new);
    document.documentElement.style.setProperty("--your_percentage", your_new);
}

}
     
export default Levelbar