import { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useTranslation } from 'react-i18next'; 
import '../../Style/Auth.css';
import { useResendOtpMutation, useVerifyUserMutation } from '../../app/Api/Users';
import { useNavigate, useParams } from 'react-router-dom';

const OTPForm = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); 
  const [verifyEmail, { isLoading }] = useVerifyUserMutation();
  const [resendOtp] = useResendOtpMutation();
  const [timer, setTimer] = useState(() => {
    const savedTime = localStorage.getItem('otpTimer');
    return savedTime ? parseInt(savedTime) : 300;
  }); 
    const { t } = useTranslation(); 
  const { email } = useParams();
  const navigate = useNavigate();
  
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
        await verifyEmail({ email, otp: otpValue }).unwrap();
        notification.success({
          message: t('verificationSuccessful'),
          description: t('otpVerified', { otp: otpValue }),
        });
        localStorage.removeItem('otpTimer')
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

  // const handleSendOTP = () => {
  //   notification.success({
  //     message: t('otpSent'),
  //     description: t('otpSent'),
  //   });
  // };
  // handleSendOTP
  const handleSendOTP = async () => {
    try {
      await resendOtp({ email }).unwrap(); 
      notification.success({
        message: t('otpResent'),
      });
    } catch (error) {
      notification.error({
        message: t('resendOtpFailed'),
        description: error?.data?.error,
      });
    }
  };


  const minutes = Math.floor(timer / 60); 
  const seconds = timer % 60;

  return (
    <div className="container">
      <div className="text-container" data-aos="fade-right">
        <div className="text-content">
          <h2>{t('otpVerification')}</h2>
          <p>{t('enterOtp')}</p>
        </div>
      </div>

      <div className="form-container" data-aos="fade-up">
        <h2 className="heading">{t('verifyOtp')}</h2>
        <Form layout="vertical" onFinish={handleSubmit}>
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
            {timer===0&&(
              
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

export default OTPForm;
