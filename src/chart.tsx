import * as React from 'react';
import {Chart} from 'react-google-charts';
import IStock from './model/stock'

interface IState {
  isLoaded: boolean,
  error: any,
  stocks: any[]
}

class DrawChart extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      stocks: []
    }
  }

  public componentDidMount(): void {
    const url: string = "https://api.iextrading.com/1.0/stock/aapl/chart/1d";
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        const stockData: any[] = [];
        stockData.push(["time", "high", "low"]);
        result.map((stock: IStock) => {
          stockData.push([stock.minute, stock.high, stock.low]);
        })
        this.setState({
          error: null,
          isLoaded: true,
          stocks: stockData
        })
      },
      (error) => {
        this.setState({
          error,
          isLoaded: true,
        });
      }
    );
  }

  public render(): JSX.Element {
    const data = this.state.stocks;
    return(
      <div>
      <Chart
        height={300}
        chartType="Line"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          chartArea: { width: '90%' },
          hAxis: {
            minValue: 0,
            title: 'Total Population',
          },
          title: 'Population of Largest U.S. Cities',
          vAxis: {
            title: 'time',
          },
        }}
        />
        </div>
    )
  }

}

export default DrawChart
