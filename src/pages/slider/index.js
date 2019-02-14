import './index.less'
// import logo from '../../assets/userLogo.jpeg'
import React, { Component } from 'react'
import { Icon, Avatar, notification, Upload } from 'antd'
import { Link } from 'react-router-dom'
import https from '../../utils/https'
import urls from '../../utils/urls'
import { beforeUpload } from '../../utils/upload'

class SliderRight extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      keyword: '',
      type: 2, //1 :其他友情链接 2: 是管理员的个人链接 ,‘’ 代表所有链接
      pageNum: 1,
      pageSize: 50,
      uploading: false,
      imageUrl: '',
      list: [],
      linkList: [],
      filingList: [
        {
          id: 1,
          name: '2018-12-12',
          urlId: '/home'
        },
        {
          id: 2,
          name: '2018-12-12',
          urlId: '/home'
        },
        {
          id: 3,
          name: '2018-12-12',
          urlId: '/home'
        }
      ]
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.loadLink = this.loadLink.bind(this)
  }

  componentDidMount() {
    this.handleSearch()
    this.loadLink()
  }
  loadLink = () => {
    https
      .get(urls.getLinkList, {
        params: {
          type: this.state.type,
          keyword: this.state.keyword,
          pageNum: this.state.pageNum,
          pageSize: this.state.pageSize
        }
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            linkList: res.data.data.list
          })
        } else {
          notification.error({
            message: res.data.message
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleSearch = () => {
    https
      .get(urls.getTagList, {
        params: {
          keyword: this.state.keyword,
          pageNum: this.state.pageNum,
          pageSize: this.state.pageSize
        }
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            list: res.data.data.list
          })
        } else {
          notification.error({
            message: res.data.message
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  componentDidUpdate(prevProps) {
    if (this.props.userInfo !== prevProps.userInfo) {
      this.setState({
        imageUrl: this.props.userInfo.avatar
      })
    }
  }
  handleClick(event) {
    this.setState({
      //   [event.target.name]: event.target.value
    })
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ uploading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log(info, 'event')
      this.setState({ imageUrl: info.file.response.data.path }, () => {
        console.log(this.state.imageUrl, 'done')
      })
    }
  }
  render() {
    const list = this.state.list.map((item, i) => (
      <Link
        className="item"
        key={item._id}
        to={`/home?tag_id=${item._id}&tag_name=${item.name}&category_id=`}
      >
        <span key={item._id}>{item.name}</span>
      </Link>
    ))
    const linkChildren = this.state.linkList.map(item => (
      <a key={item._id} target="_blank" href={item.url}>
        <Icon
          key={item._id}
          type={item.icon}
          theme="outlined"
          style={{ fontSize: '20px', marginRight: '10px' }}
        />
      </a>
    ))
    const userInfo = this.props.userInfo
    const { imageUrl } = this.state
    if (!userInfo) {
      return null
    }
    return (
      <div className="right">
        <Upload
          name="avatar"
          action="/api/uploadAvatar"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
          data={{ id: userInfo._id }}
        >
          <Avatar
            className="right-logo"
            src={'/api/' + imageUrl}
            size={130}
            icon="user"
            alt={userInfo.name}
          />
        </Upload>
        <div className="title">{userInfo.name}</div>
        <div className="right-content" />
        <div className="introduce">
          <div className="content">{userInfo.content}</div>
          <div className="footer">{linkChildren}</div>
        </div>
        <div className="tags">
          <div className="title">标签云</div>
          {list}
        </div>
        {/* <div className="classification">
					<div className="title">文章归档</div>
					{filingList}
				</div> */}
      </div>
    )
  }
}

export default SliderRight
