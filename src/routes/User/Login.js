import React, { Component } from 'react';
import { connect } from 'dva';
// import { Link } from 'dva/router';
// import { Checkbox, Alert, Icon } from 'antd';
import { Checkbox, Alert, Button } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 30 }} message={content} type="error" showIcon />;
  };

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          <Tab key="account" tab="账户密码登录">
            {login.status === 'error' &&
              login.type === 'account' &&
              !login.submitting &&
              this.renderMessage('账号和密码不匹配，请您重新输入！')}
            <UserName name="userName" placeholder="请输入您的账号" />
            <Password name="password" placeholder="请输入您的密码" />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            {login.status === 'error' &&
              login.type === 'mobile' &&
              !login.submitting &&
              this.renderMessage('验证码错误')}
            <Mobile name="mobile" />
            <Captcha name="captcha" />
          </Tab>

          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            {/* <a style={{ float: 'right' }} href="">
              忘记密码
            </a> */}
            <Button
              style={{
                float: 'right',
                border: '0',
                background: 'rgba(0, 0, 0, 0)',
                lineHeight: '20px',
                height: '20px',
              }}
              disabled
            >
              忘记密码
            </Button>
          </div>

          <Submit loading={submitting}>登录</Submit>

          <div className={styles.other}>
            暂不开放三方登录
            {/* <Icon className={styles.icon} type="alipay-circle" />
            <Icon className={styles.icon} type="taobao-circle" />
            <Icon className={styles.icon} type="weibo-circle" />
            <Link className={styles.register} to="/user/register">
              注册账户
            </Link> */}
            <Button
              style={{
                float: 'right',
                border: '0',
                background: 'rgba(0, 0, 0, 0)',
                lineHeight: '20px',
                height: '20px',
              }}
              disabled
            >
              注册账户
            </Button>
          </div>
        </Login>
      </div>
    );
  }
}
