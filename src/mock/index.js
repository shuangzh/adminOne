import Mock from 'mockjs'

const success = {
    code : 0,
    message: 'success'
}

Mock.mock("/login", 'post', success)

export default Mock;
