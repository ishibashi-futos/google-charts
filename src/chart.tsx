import * as React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
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
    this.renewData = this.renewData.bind(this);
  }

  public componentDidMount(): void {
    const url: string = "https://api.iextrading.com/1.0/stock/aapl/chart/1m";
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        const stockData: any[] = [];
        stockData.push(["date", "low", "close", "open", "high"]);
        result.map((stock: IStock) => {
          stockData.push([stock.date, stock.low, stock.close, stock.open, stock.high]);
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
        <Dropdown onSelect={this.renewData}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
          chose range
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as="button" eventKey="1d">yesterday</Dropdown.Item>
            <Dropdown.Item as="button" eventKey="1m">1 Month</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Chart
          height={300}
          chartType="CandlestickChart"
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            chartArea: { width: '90%' },
            hAxis: {
              minValue: 0,
            },
            title: 'aapl charts',
            vAxis: {
              title: 'time',
            },
          }}
          />
      </div>
    )
  }

  private renewData(eventKey: any): void {
    const url: string = `https://api.iextrading.com/1.0/stock/aapl/chart/${eventKey}`;
    let header: any[];
    switch (eventKey) {
      case "1d":
        header = ["time", "low", "close", "open", "high"]
      case "1m":
        header = ["date", "low", "close", "open", "high"]
    }
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        const stockData: any[] = [];
        stockData.push(header);
        result.map((stock: IStock) => {
          if (eventKey !== "1m") {
            stockData.push([stock.minute, stock.low, stock.close, stock.open, stock.high]);
          } else {
            stockData.push([stock.date, stock.low, stock.close, stock.open, stock.high]);
          }
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
}

export default DrawChart
