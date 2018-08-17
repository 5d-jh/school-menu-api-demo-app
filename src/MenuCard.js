import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabPane, TabContent, Button } from 'reactstrap';
import ContentLoader from 'react-content-loader';
import classnames from 'classnames';
import './MenuCard.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'material-icons/iconfont/material-icons.css';

class MenuCard extends Component {
  state = {
    activeTab: '2'
  }
  
  toggleTab = (event) => {
    let tab = event.target.name;
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  changeDateToTomorrow = () => {
    this.props.onDateChange(1)
  }
  changeDateToYesterday = () => {
    this.props.onDateChange(-1)
  }

  loadingElement = <ContentLoader
                    height={200}
                    speed={0.5}
                    primaryColor="#F2F2F2"
                    secondaryColor="#F7F7F7"
                  >
                  </ContentLoader>

  render() {
    return (
      <div className="_card">
        <Nav pills fill>
          <NavItem>
            <NavLink 
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={this.toggleTab}
              name="1"
            >
              아침
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={this.toggleTab}
              name="2"
            >
              점심
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={this.toggleTab}
              name="3"
            >
              저녁
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div className="_menuContent">
              {
                this.props.menu ? (new Array(this.props.menu.breakfast))[0].map(
                  (menu, i) => <span className="_menuBlock" key={i}>{menu.replace(/\d|[.]/g, '')}</span>
                ) : this.loadingElement
              }
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="_menuContent">
              {
                this.props.menu ? (new Array(this.props.menu.lunch))[0].map(
                  (menu, i) => <span className="_menuBlock" key={i}>{menu.replace(/\d|[.]/g, '')}</span>
                ) : this.loadingElement
              }
            </div>
          </TabPane>
          <TabPane tabId="3">
            <div className="_menuContent">
              {
                this.props.menu ? (new Array(this.props.menu.dinner))[0].map(
                  (menu, i) => <span className="_menuBlock" key={i}>{menu.replace(/\d|[.]/g, '')}</span>
                ) : this.loadingElement
              }
            </div>
          </TabPane>
        </TabContent>
        <div>
          <Button color="link" onClick={this.changeDateToYesterday} className="_btnWithIcon">
            <i className="material-icons">
              navigate_before
            </i>
            어제
          </Button>
          <Button color="link" onClick={this.changeDateToTomorrow} className="_btnWithIcon">
            내일
            <i className="material-icons">
              navigate_next
            </i>
          </Button>
        </div>
      </div>
    )
  }
}

export default MenuCard;