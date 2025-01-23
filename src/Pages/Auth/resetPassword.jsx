import { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useTranslation } from 'react-i18next'; 
import '../../Style/Auth.css';
import { useResendOtpMutation, useResetPasswordMutation } from '../../app/Api/Users';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [resendOtp] = useResendOtpMutation();
  const [timer, setTimer] = useState(() => {
    const savedTime = localStorage.getItem('otpTimer');
    return savedTime ? parseInt(savedTime) : 180; 
  }); 

  const { t , i18n} = useTranslation(); 
  const { email } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    localStorage.setItem('otpTimer', timer);
    if (timer === 0) {
      handleSendOTP(); 
      return; 
    }

    const countdown = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleInputChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(0, 1);
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      try {
        await resetPassword({ email, otp: otpValue, password, password_confirmation: passwordConfirmation }).unwrap();
        notification.success({
          message: t('verificationSuccessful'),
          description: t('otpVerified', { otp: otpValue }),
        });
        form.resetFields();
        navigate('/login');
      } catch (error) {
        if (error.status === 400 && error.data?.error) {
          const apiErrors = error.data?.error;
          notification.error({
            message: t('signupFailed'),
            description: apiErrors,
          });
        } else {
          notification.error({
            message: t('signupFailed'),
            description: t(''),
          });
        }
      }
    } else {
      notification.error({
        message: t('verificationFailed'),
        description: t('pleaseEnterOtp'),
      });
    }
  };

  const handleSendOTP = async () => {
    try {
      await resendOtp({ email }).unwrap(); 
      notification.success({
        message: t('otpResent'),
      });
      setTimer(180); 
      setOtp(['', '', '', '', '', '']);
      form.resetFields(['password', 'password_confirmation']); 
    } catch (error) {
      notification.error({
        message: t('resendOtpFailed'),
        description: error?.data?.error,
      });
    }
  };

  const isEn = i18n.language === 'EN'

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="container">
      <div className="text-container" data-aos="fade-right">
        <div className="text-content">
          <h2>{isEn?"Reset Password":"اعاده كلمه المرور"}</h2>
          <p>{isEn?"Fill in the information to set your own password":"املئ البيانات لتعيين كلمه مرور خاصه بك"}</p>
        </div>
      </div>

      <div className="form-container" data-aos="fade-up">
        <h2 className="heading">{t('verifyOtp')}</h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label={t('otp')} required>
            <div style={{ display: 'flex', gap: '10px' }}>
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  style={{
                    width: '72px',
                    textAlign: 'center',
                    fontSize: '18px',
                  }}
                />
              ))}
            </div>
          </Form.Item>

          <Form.Item 
            label={t('Password')} 
            name="password" 
            rules={[
              { required: true,  message: isEn?"Password is Required":" كلمه المرور مطلوبه" },
              { min: 8, message: isEn?"The limit for password length is 8":"الحد الأدنى لطول كلمة المرور هو 8"},
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('enterPassword')}
            />
          </Form.Item>

          <Form.Item 
            label={t('Confirm Password')} 
            name="password_confirmation" 
            rules={[
              { required: true, message: isEn?"confirm Password is Required":"تاكيد كلمه المرور مطلوبه" },
              { min: 8, message: isEn?"The limit for password length is 8":"الحد الأدنى لطول كلمة المرور هو 8" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('passwordsMustMatch')));
                },
              }),
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input.Password
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder={t('confirmPassword')}
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
              {t('verifyOtpButton')}
            </Button>
          </Form.Item>

          {timer === 0 && (
            <Form.Item>
              <Button
                type="link"
                className="link-auth"
                onClick={handleSendOTP}
                block
                style={{ padding: 0 }}
              >
                {t('sendOtpButton')}
              </Button>
            </Form.Item>
          )}

          <div className="countdown-timer">
            {timer > 0 ? (
              <p>{t('resendOtpIn')} {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
            ) : (
              <p>{t('otpResent')}</p>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
