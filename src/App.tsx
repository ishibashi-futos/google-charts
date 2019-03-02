import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import IStock from './model/stock'

interface IState {
  isLoaded: boolean,
  error: any,
  stocks: IStock[]
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      error: null,
      isLoaded: true,
      stocks: []
    }
  }

  public componentDidMount(): void {
    const url: string = "https://api.iextrading.com/1.0/stock/aapl/chart/1d";
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          error: null,
          isLoaded: true,
          stocks: result
        })
        this.state.stocks.map((stock: IStock) => {
          console.log(stock.minute);
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

  public render() {
    const {error, isLoaded, stocks}: IState = this.state;
    if(error) {
      return (<div>{error.message}</div>) 
    } else if(!isLoaded) {
      return (<div>NowLoading...</div>)
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ul>
          {
            stocks.map((value) => {
              return (<li key={value.minute}>{value.high}</li>)
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
