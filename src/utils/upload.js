import { message } from 'antd'

const beforeUpload = file => {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('只能上传jpg或image文件!')
  }
  const isLt10M = file.size / 1024 / 1024 < 10
  if (!isLt10M) {
    message.error('图片大小不能 2MB!')
  }
  return isJPG && isLt10M
}
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export { beforeUpload,getBase64 }
