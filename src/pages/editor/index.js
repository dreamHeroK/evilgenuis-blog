import React, { Component } from 'react';
import SimpleMDE from 'simplemde';
import marked from 'marked';
import highlight from 'highlight.js';
import 'simplemde/dist/simplemde.min.css';
import { connect } from 'react-redux';
import './index.less';
import { Select, Input, Button } from 'antd';
import { saveArticle } from '../../store/actions/articles';

export default
@connect(
  state => state.getIn(['user']),
  { saveArticle }
)
class index extends Component {
  state = {
    title: undefined,
    img_url: undefined,
    type: '0',
  };
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
              return highlight.highlightAuto(code).value;
            }
          });
        }
      })
    });
  };
  changeTitle = e => {
    this.setState({ title: e.target.value });
  };
  changeImgUrl = e => {
    this.setState({ img_url: e.target.value });
  };
  changeType = e => {
    this.setState({ type: e });
  };
  onSubmit = () => {
    const { title, img_url, type, smde } = this.state;
    const { saveArticle, userInfo } = this.props;
    const content = smde.value();
    const author = userInfo.name;
    saveArticle({ title, img_url, type, content ,author});
  };
  render() {
    const { title, img_url ,type} = this.state;
    return (
      <div>
        <Input
          addonBefore="标题"
          size="large"
          placeholder="标题"
          name="title"
          value={title}
          onChange={this.changeTitle}
        />
        <Input
          addonBefore="封面链接"
          size="large"
          placeholder="封面链接"
          name="img_url"
          value={img_url}
          onChange={this.changeImgUrl}
        />

        <Select
          style={{ width: 200, marginTop: 20, marginBottom: 20 }}
          placeholder="选择发布状态"
          value={type}
          onChange={this.changeType}
        >
          {/*  0 草稿，1 发布 */}
          <Select.Option value="0">草稿</Select.Option>
          <Select.Option value="1">发布</Select.Option>
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
    );
  }
}
