import { Chart } from 'react-google-charts';
import React from 'react';
 
class ForecastChart extends React.Component {
  constructor(props) {

    super(props);
    
    this.state = {
      options: {
        title: 'Forcast vs. Past Sales comparison',
        hAxis: { title: 'Week', minValue: 0, maxValue: 52 },
        vAxis: { title: 'Quantity', minValue: 0, maxValue:20},
      //   legend: 'none',
      },
      data: [
        ['Week', 'PstQuantity', 'FtrQuantity' ],
        [8, 12, 10],
      ],
    };

  }

  render() {

    if(this.props.show === false){
      return null;
    }
    let chartData = [];

    chartData.push(['Week', 'PstQuantity', 'FtrQuantity' ]);

    console.log(this.props.forecastInfo)
    this.props.forecastInfo.forEach((entry)=>{
        let multFtr = Math.floor(entry.quantity * (this.props.multiplier ? Math.abs(this.props.multiplier) : 1))
        
        for(let i = 0; i < this.props.pastInfo.length; i++){
          console.log(this.props.pastInfo);
          console.log(this.props.pastInfo[i]);
          console.log(this.props.pastInfo[i].week);
          if(this.props.pastInfo[i].week === entry.week){
            chartData.push([entry.week, this.props.pastInfo[i].quantity, multFtr])
            break;
          }
        }
    })

   
    return (
      <Chart
        chartType="ColumnChart"
        data={chartData}
        options={this.state.options}
        graph_id="ScatterChart"
        width="100%"
        height="400px"
        legend_toggle
      />
    );
  }
}
export default ForecastChart;