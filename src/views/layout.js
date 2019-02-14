import './index.less'
import './mobile.less'
import React, { Component } from 'react'
import SliderRight from '../pages/slider/index'
import Nav from '../pages/nav/nav'
import { Layout, BackTop } from 'antd'
import { connect } from 'react-redux'
import { getUserInfo } from '../store/actions/user'
const { Content, Sider } = Layout

@connect(
  state => state.getIn(['user']),
  { getUserInfo }
)
class Layouts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // value: null,
    }
  }
  componentDidMount() {
    let userInfo =
      window.sessionStorage.userInfo &&
      JSON.parse(window.sessionStorage.userInfo)
    if (userInfo) {
      this.props.getUserInfo(userInfo)
    }
  }
  render() {
    const { userInfo, dispatch } = this.props
    console.log(userInfo, 'userInfo')
    return (
      <div className="Layouts">
        <Nav
          pathname={this.props.location.pathname}
          userInfo={userInfo}
          dispatch={dispatch}
        />
        <Layout className="layout">
          <Content>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Content style={{ padding: '0 24px 0 0', minHeight: 280 }}>
                {this.props.children}
              </Content>
              {this.props.location.pathname === '/articleDetail' ||
              this.props.location.pathname === '/about' ||
              this.props.location.pathname === '/editor' ? (
                ''
              ) : (
                <Sider width={350} style={{ background: '#fff' }}>
                  <SliderRight userInfo={userInfo} />
                </Sider>
              )}
            </Layout>
          </Content>
        </Layout>
        <BackTop />
      </div>
    )
  }
}

export default Layouts
