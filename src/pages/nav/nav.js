import './index.less';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon, Menu, Row, Col, Button, Drawer } from 'antd';
import Register from '../register/register';
import Login from '../login/login';
import { isMobileOrPc } from '../../utils/utils';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

// @connect(state => state.getIn(['user']), dispatch => bindActionCreators({ }, dispatch))
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      visible: false,
      placement: 'top',
      current: null,
      menuCurrent: '',
      login: false,
      register: false,
      nav: '首页',
      navTitle: '首页'
    };
    this.menuClick = this.menuClick.bind(this);
    this.showLoginModal = this.showLoginModal.bind(this);
    this.showRegisterModal = this.showRegisterModal.bind(this);
    this.handleLoginCancel = this.handleLoginCancel.bind(this);
    this.handleRegisterCancel = this.handleRegisterCancel.bind(this);
    this.initMenu = this.initMenu.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.onClose = this.onClose.bind(this);
  }
  componentDidMount() {
    if (isMobileOrPc()) {
      this.setState({
        isMobile: true
      });
    }
    this.initMenu(this.props.pathname);
  }

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  initMenu(name) {
    let key = '1';
    let navTitle = '';
    if (name === '/') {
      key = '1';
      navTitle = '首页';
    } else if (name === '/home') {
      key = '1';
      navTitle = '首页';
    } else if (name === '/hot') {
      key = '2';
      navTitle = '热门';
    } else if (name === '/timeLine') {
      key = '3';
      navTitle = '历程';
    } else if (name === '/message') {
      key = '4';
      navTitle = '留言';
    } else if (name === '/about') {
      key = '5';
      navTitle = '关于我';
    } else if (name === '/articleDetail') {
      key = '6';
      navTitle = '文章详情';
    }
    this.setState({
      navTitle,
      menuCurrent: key
    });
  }

  componentWillReceiveProps(nextProps) {
    // console.log('next :', nextProps);
    this.initMenu(nextProps.pathname);
  }

  handleMenu = e => {
    // console.log('click ', e);
    this.setState({
      menuCurrent: e.key
    });
  };

  handleLogout = e => {
    // console.log('click ', e);
    const { dispatch } = this.props;
    this.setState({
      current: e.key
    });
    window.sessionStorage.removeItem('userInfo');
    dispatch({ type: 'LOGOUT' });
    this.onClose();
  };

  showLoginModal() {
    this.onClose();
    // [event.target.name]: event.target.value
    this.setState({
      login: true
    });
  }
  showRegisterModal() {
    this.onClose();
    this.setState({
      register: true
    });
  }
  handleLoginCancel() {
    this.setState({
      login: false
    });
  }
  handleRegisterCancel() {
    this.setState({
      register: false
    });
  }
  menuClick({ key }) {
    this.setState({
      nav: key
    });
  }
  toWrite = () => {
    console.log(this.props, 'props');
  };
  render() {
    let userInfo = '';
    if (window.sessionStorage.userInfo) {
      userInfo = JSON.parse(window.sessionStorage.userInfo);
    }
    return (
      <div className="nav">
        {this.state.isMobile ? (
          <Header
            className="header"
            style={{
              position: 'fixed',
              zIndex: 1,
              top: 0,
              width: '100%',
              height: '64px',
              float: 'left',
              backgroundColor: 'white',
              borderBottom: '1px solid #eee'
            }}
          >
            <Row className="container">
              <Col style={{ textAlign: 'center', width: '50%', float: 'left' }}>
                <div className="nav-title"> {this.state.navTitle} </div>
              </Col>
              <Col style={{ textAlign: 'right', width: '25%', float: 'left' }}>
                <div>
                  {/* <a className='user-name'>{userInfo.name}</a> */}
                  <Icon
                    type="bars"
                    onClick={this.showDrawer}
                    style={{
                      fontSize: '40px',
                      marginRight: '10px',
                      marginTop: '10px'
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Header>
        ) : (
          <Header
            className="header "
            style={{
              position: 'fixed',
              zIndex: 1,
              top: 0,
              width: '100%',
              minWidth: '1200px',
              height: '66px',
              float: 'left',
              backgroundColor: 'white',
              borderBottom: '1px solid #eee'
            }}
          >
            <div
              style={{
                width: '120px',
                float: 'left',
                fontSize: '20px',
                marginLeft: '120px',
                color: '#333'
              }}
            >
              <a href="/">evil-genuis</a>
            </div>
            <Row className="container">
              <Col style={{ width: '680px', float: 'left' }}>
                <Menu
                  theme="light"
                  mode="horizontal"
                  defaultSelectedKeys={['1']}
                  onClick={this.handleMenu}
                  selectedKeys={[this.state.menuCurrent]}
                  style={{ lineHeight: '64px', borderBottom: 'none',color:'#333',fontSize:'17px' }}
                >
                  <Menu.Item key="1">
                    <Link to="/home">
                      <Icon type="home" theme="outlined" style={{fontSize:'20px'}}/>
                      首页
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/hot">
                      <Icon type="fire" theme="outlined"style={{fontSize:'20px'}} />
                      热门
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/timeLine">
                      <Icon type="hourglass" theme="outlined"style={{fontSize:'20px'}} />
                      时间轴
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/message">
                      <Icon type="message" theme="outlined" style={{fontSize:'20px'}}/>
                      留言
                    </Link>
                  </Menu.Item>
                  {/* <Menu.Item key="5">
                    <Link to="/about">
                      <Icon type="user" theme="outlined" />
                      关于
                    </Link>
                  </Menu.Item> */}
                </Menu>
              </Col>
              <Col
                style={{ textAlign: 'right', width: '400px', float: 'left' }}
              >
                {userInfo ? (
                  <Menu
                    onClick={this.handleLogout}
                    style={{
                      width: 220,
                      lineHeight: '64px',
                      display: 'inline-block'
                    }}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                  >
                    <SubMenu
                      title={
                        <span className="submenu-title-wrapper">
                          <Icon type="user" /> {userInfo.name}
                        </span>
                      }
                    >
                      <MenuItemGroup>
                        <Menu.Item key="logout">退出</Menu.Item>
                      </MenuItemGroup>
                    </SubMenu>
                  </Menu>
                ) : (
                  <div>
                    <Button
                      type="primary"
                      icon="login"
                      style={{ marginRight: '15px' }}
                      onClick={this.showLoginModal}
                    >
                      登 录
                    </Button>
                    <Button
                      type="danger"
                      icon="logout"
                      style={{ marginRight: '15px' }}
                      onClick={this.showRegisterModal}
                    >
                      注 册
                    </Button>
                  </div>
                )}
                {userInfo && (
                  <Link to="/editor">
                    <Button
                      type="default"
                      style={{ marginLeft: '15px' }}
                      className="writeBtn"
                    >
                      <svg className="icon" aria-hidden="true" color="#fff">
                        <use xlinkHref="#icon-plumage" />
                      </svg>
                      写文章
                    </Button>
                  </Link>
                )}
              </Col>
            </Row>
          </Header>
        )}

        <Drawer
          // title="Basic Drawer"
          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          height={295}
        >
          <div className="drawer">
            <p onClick={this.onClose}>
              <Link to="/home">
                <Icon type="home" /> 首页
              </Link>
            </p>
            <p onClick={this.onClose}>
              <Link to="/hot">
                <Icon type="fire" onClick={this.showLoginModal} /> 热门
              </Link>
            </p>
            <p onClick={this.onClose}>
              <Link to="/timeLine">
                <Icon type="hourglass" onClick={this.showLoginModal} /> 历程
              </Link>
            </p>
            <p onClick={this.onClose}>
              <Link to="/message">
                <Icon type="message" onClick={this.showLoginModal} /> 留言
              </Link>
            </p>
            <p onClick={this.onClose}>
              <Link to="/about">
                <Icon type="user" onClick={this.showLoginModal} /> 关于
              </Link>
            </p>

            {userInfo ? (
              <div onClick={this.handleLogout}>
                <p>{userInfo.name}</p>
                <p>
                  <Icon type="logout" /> 退出{' '}
                </p>
              </div>
            ) : (
              <div>
                <p onClick={this.showLoginModal}>
                  <Icon type="login" /> 登录
                </p>
                <p onClick={this.showRegisterModal}>
                  <Icon type="logout" /> 注册{' '}
                </p>
              </div>
            )}
          </div>
        </Drawer>
        <Login
          visible={this.state.login}
          handleCancel={this.handleLoginCancel}
        />
        <Register
          visible={this.state.register}
          handleCancel={this.handleRegisterCancel}
        />
      </div>
    );
  }
}

export default Nav;
