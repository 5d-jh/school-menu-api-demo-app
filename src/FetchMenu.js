import React, { Component } from 'react';
import MenuCard from './MenuCard';
import MenuError from './MenuError';

class FetchMenu extends Component {
  state = {
    menu: null,
    errorOccurred: false,
    errorInfo: ''
  }

  date = new Date();

  fetchMenu = () => {
    let date = this.date.getDate();
    this.props.onDateChange(this.date);

    let url = `https://schoolmenukr.ml/api/${this.props.region}/${this.props.schoolCode}?date=${date}`;
    return fetch(url)
    .then(response => {
      this.setState({
        errorOccurred: false
      });
      return response.json()
    })
    .then(response => response[0])
    .catch((err) => {
      this.setState({
        errorOccurred: true,
        errorInfo: err
      });
    });
  }

  getMenu = async() => {
    let menu = await this.fetchMenu();
    this.setState({
      menu: menu
    });
    
  }

  changeDate = async(days) => {
    await this.setState({
      menu: null
    })
    this.date.setDate(this.date.getDate() + days);
    this.getMenu();
  }

  componentDidCatch(err, info) {
    this.setState({
      errorOccurred: true,
      errorInfo: err
    });
  }

  componentDidMount() {
    this.getMenu();
  }

  render() {
    if (!this.state.errorOccurred) {
      return (
        <MenuCard
          menu={this.state.menu}
          onDateChange={this.changeDate}
        />
      )
    } else {
      return (
        <MenuError tryAgain={this.getMenu} />
      )
    }
  }
}

export default FetchMenu;