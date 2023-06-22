import React, {Component, useEffect, useState} from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from "axios";
import {getValue} from "@testing-library/user-event/dist/utils";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Graph() {
    const [count1,setCount1] = useState([])
    const [count2,setCount2] = useState([])
    const [count3,setCount3] = useState([])
    //let one = parseInt(Object.values(count1[0] || {}).toString())

    //console.log(Object.values(count1[0]))
    //console.log(i)
    function generateDataPoints() {
        axios.get("http://localhost:3001/getCountPoint1").then((response) =>{
            setCount1(response.data)
        })
        axios.get("http://localhost:3001/getCountPoint2").then((response) =>{
            setCount2(response.data)
        })
        axios.get("http://localhost:3001/getCountPoint3").then((response) =>{
            setCount3(response.data)
        })
        let one = parseInt(Object.values(count1[0] || {}).toString())
        let two = parseInt(Object.values(count2[0] || {}).toString())
        let three = parseInt(Object.values(count3[0] || {}).toString())
        const dps = [];
            dps.push({label: 1,y: one});
            dps.push({label: 2,y: two});
            dps.push({label: 3,y: three});
        //console.log(dps)
        return dps;
    }

        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", //"light1", "dark1", "dark2"
            // title:{
            //     text: "Summary of Waste Management"
            // },
            axisY: {
                title: "Count"
            },
            axisX: {
                title: "Scan Point"
            },
            data: [{
                type: "column", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: generateDataPoints()
            }]
        }

        return (
            <div>
                <CanvasJSChart options = {options}/>
            </div>
        );
}

export default Graph;