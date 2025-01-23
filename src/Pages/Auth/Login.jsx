import { Form, Input, Button, notification, Space } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginUserMutation } from '../../app/Api/Users';
import { useTranslation } from 'react-i18next';
import '../../Style/Auth.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { t } = useTranslation();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('Please enter a valid email address'))
        .required(t('Email is required')),
      password: Yup.string().required(t('Password is required')),
    }),
    onSubmit: async (values) => {
      try {
        const res = await loginUser({ email: values.email, password: values.password }).unwrap();
        notification.success({
          message: t('loginSuccess'),
          description: t('storePage'),
        });
        const expires = new Date();
        expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie = `token=${res?.token};expires=${expires.toUTCString()};path=/`;
        navigate('/')
      } catch (error) {
        notification.error({
          message: t('loginError'),
          description: error.message || t('loginError'),
        });
      }
    },
  });

  return (
    <div className="container">
      <div className="text-container" data-aos="fade-right">
        <div className="text-content">
          <h2>{t('welcome')}</h2>
          <p>{t('loginPrompt')}</p>
        </div>
      </div>

      <div className="form-container" data-aos="fade-up">
        <h2 className="heading">{t('login')}</h2>
        <Form onFinish={formik.handleSubmit} layout="vertical">
          <Form.Item label={t('email')} required>
            <Input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t('enterEmail')}
              status={formik.touched.email && formik.errors.email ? 'error' : ''}
            />
            {formik.touched.email && formik.errors.email && (
              <span style={{ color: 'red' }}>{formik.errors.email}</span>
            )}
          </Form.Item>

          <Form.Item label={t('password')} required>
            <Input.Password
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t('enterPassword')}
              status={formik.touched.password && formik.errors.password ? 'error' : ''}
            />
            {formik.touched.password && formik.errors.password && (
              <span style={{ color: 'red' }}>{formik.errors.password}</span>
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="banner-button" loading={isLoading}>
              {t('login')}
            </Button>
          </Form.Item>

          <Space direction="horizontal" style={{ width: '100%', textAlign: 'center' }}>
            <Button type="link" className="link-auth" href="/forgot-password" style={{ padding: 0 }}>
              {t('forgotPassword')}
            </Button>
            <Button type="link" className="link-auth" href="/sign-up" style={{ padding: 0 }}>
              {t('createAccount')}
            </Button>
          </Space>
        </Form>
      </div>
    </div>
  );
};

export default Login;
