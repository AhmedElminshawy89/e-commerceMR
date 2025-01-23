import { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useForgetPasswordMutation } from '../../app/Api/Users';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const { i18n } = useTranslation();
  const [changePassword, { isLoading, error }] = useForgetPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await changePassword({ email }).unwrap();

      notification.success({
        message: i18n.language === 'EN' ? 'Password reset link sent!' : 'تم إرسال رابط إعادة تعيين كلمة المرور!',
      });
      navigate(`/reset-password/${encodeURIComponent(email)}`);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      notification.error({
        message: i18n.language === 'EN' ? 'Failed to send password reset link.' : 'فشل في إرسال رابط إعادة تعيين كلمة المرور.',
        description: error?.data?.message || '',
      });
    }   
  };

  const lang = i18n.language === 'EN' ? 'Email' : 'البريد الإلكتروني';

  return (
    <>
      <div className="container">
        <div className="text-container" data-aos="fade-right">
          <div className="text-content">
            <h2>{i18n.language === 'EN' ? 'Forget Password' : 'نسيت كلمة المرور'}</h2>
            <p>{i18n.language === 'EN' ? 'Change it to continue shopping' : 'قم بتغييرها لكي تستمر ف التسوق'}</p>
          </div>
        </div>

        <div className="form-container" data-aos="fade-up">
          <h2 className="heading">{i18n.language === 'EN' ? 'Forget Password' : 'نسيت كلمة المرور'}</h2>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label={lang}
              name="email"
              rules={[{ required: true, message: i18n.language === 'EN' ? 'Please enter your email' : 'يرجى إدخال بريدك الإلكتروني' }]}
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={i18n.language === 'EN' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="banner-button"
                loading={isLoading}  
              >
                {i18n.language === 'EN' ? 'Submit' : 'إرسال'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
