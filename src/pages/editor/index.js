import React, { Component } from 'react'
import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import 'simplemde/dist/simplemde.min.css'
import './index.less'
import { Select, Input, Button } from 'antd'

export default class index extends Component {
  state = {
    title: '',
    author: '',
    tags: '',
    category: '',
    keyword: '',
    desc: '',
    img_url: '',
    type: '',
    origin: ''
  }
  componentDidMount = () => {
    this.setState({
      smde: new SimpleMDE({
        element: document.getElementById('editor').childElementCount,
        autofocus: true,
        autosave: true,
        previewRender(plainText) {
          return marked(plainText, {
            renderer: new marked.Renderer(),
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: true,
            smartLists: true,
            smartypants: true,
            highlight(code) {
              return highlight.highlightAuto(code).value
            }
          })
        }
      })
    })
  }

  render() {
    const { title } = this.state
    return (
      <div>
        <Input
          addonBefore="标题"
          size="large"
          placeholder="标题"
          name="title"
          value={title}
          onChange={this.props.handleChange}
        />
        <Input
          addonBefore="作者"
          size="large"
          placeholder="作者"
          name="author"
          value={this.props.author}
          onChange={this.props.handleChangeAuthor}
        />
        <Input
          addonBefore="关键字"
          size="large"
          placeholder="关键字"
          name="keyword"
          value={this.props.keyword}
          onChange={this.props.handleChangeKeyword}
        />
        <Input
          addonBefore="描述"
          size="large"
          placeholder="描述"
          name="desc"
          value={this.props.desc}
          onChange={this.props.handleChangeDesc}
        />
        <Input
          addonBefore="封面链接"
          size="large"
          placeholder="封面链接"
          name="img_url"
          value={this.props.img_url}
          onChange={this.props.handleChangeImgUrl}
        />

        <Select
          style={{ width: 200, marginTop: 20, marginBottom: 20 }}
          placeholder="选择发布状态"
          defaultValue="0"
          onChange={this.props.handleChangeState}
        >
          {/*  0 草稿，1 发布 */}
          <Select.Option value="0">草稿</Select.Option>
          <Select.Option value="1">发布</Select.Option>
        </Select>

        <Select
          style={{ width: 200, marginTop: 20, marginBottom: 20 }}
          placeholder="选择文章类型"
          defaultValue="1"
          onChange={this.props.handleChangeType}
        >
          {/* 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍 */}
          <Select.Option value="1">普通文章</Select.Option>
          <Select.Option value="2">简历</Select.Option>
          <Select.Option value="3">管理员介绍</Select.Option>
        </Select>

        <Select
          style={{
            width: 200,
            marginTop: 20,
            marginLeft: 10,
            marginBottom: 20
          }}
          placeholder="选择文章转载状态"
          defaultValue="0"
          onChange={this.props.handleChangeOrigin}
        >
          {/* 0 原创，1 转载，2 混合 */}
          <Select.Option value="0">原创</Select.Option>
          <Select.Option value="1">转载</Select.Option>
          <Select.Option value="2">混合</Select.Option>
        </Select>
        <textarea
          id="editor"
          style={{ marginBottom: 20, width: 800 }}
          size="large"
          rows={6}
        />
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={this.onSubmit}>
            提交
          </Button>
        </div>
      </div>
    )
  }
}
