import { Form, Input, Button, notification, Space, Select, Steps } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../Style/Auth.css';
import {useState} from 'react'
import { useAddUserMutation } from '../../app/Api/Users';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const { Option } = Select;
const { Step } = Steps;

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(0); 
  const [ addUser ,{isLoading} ] = useAddUserMutation()
  const navigate = useNavigate();
  const { t } = useTranslation();


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      phone: '',
      country: '',
      city: '',
      gender: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('username') + ' ' + t('isRequired')),
      email: Yup.string().email(t('validEmail')).required(t('email') + ' ' + t('isRequired')),
      password: Yup.string().min(8, t('passwordMinLength')).required(t('password') + ' ' + t('isRequired')),
      password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], t('passwordsMustMatch')).required(t('confirmPassword') + ' ' + t('isRequired')),
      phone: Yup.string().matches(/^\d{10}$/, t('phoneValid')).required(t('phone') + ' ' + t('isRequired')),
      country: Yup.string().required(t('country') + ' ' + t('isRequired')),
      city: Yup.string().required(t('city') + ' ' + t('isRequired')),
      gender: Yup.string().required(t('gender') + ' ' + t('isRequired')),
    }),
    onSubmit: async (values) => {
      try {
        const response = await addUser(values).unwrap();
        notification.success({
          message: t('signupSuccess'),
          description: response?.msg || '',
        });
        formik.resetForm();
        navigate(`/verify-email/${encodeURIComponent(values.email)}`);
      } catch (error) {
        if (error.status === 422 && error?.data?.errors) {
          const apiErrors = error.data.errors;
          Object.keys(apiErrors).forEach((field) => {
            const message = apiErrors[field].join(' ');
            formik.setFieldError(field, message);
          });
          const errorMessages = Object.keys(apiErrors)
            .map((field) => `${field}: ${apiErrors[field].join(' ')}`)
            .join('\n');
          notification.error({
            message: t('signupFailed'),
            description: errorMessages,
          });
        } else {
          notification.error({
            message: t('signupFailed'),
            description: t('somethingWentWrong'),
          });
        }
      }
    },
  });

  const nextStep = () => {
    const fieldsToValidate = ['name', 'email', 'password', 'password_confirmation'];
    const isValid = fieldsToValidate.every(
      (field) => !formik.errors[field] && formik.values[field]
    );
  
    if (isValid) {
      setCurrentStep(currentStep + 1);
    } else {
      notification.error({
        message: t('validationError'),
        description: t('fillAllFieldsCorrectly'),
      });
  
      fieldsToValidate.forEach((field) => formik.setFieldTouched(field, true));
    }
  };
  

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="container">
      <div className="text-container" data-aos="fade-right">
        <div className="text-content">
        <h2>{t('welcome')}</h2>
        <p>{t('signup')}</p>
        </div>
      </div>

      <div className="form-container" data-aos="fade-up">
      <h2 className="heading">{t('finish')}</h2>

        <Steps current={currentStep} onChange={setCurrentStep} size="small" style={{ marginBottom: 10 }}>
        <Step title={t('accountInfo')} />
        <Step title={t('additionalInfo')} />
        </Steps>

        <Form onFinish={formik.handleSubmit} layout="vertical">
          {currentStep === 0 && (
            <>
              <Form.Item label={t('Username')} required  style={{marginBottom:10}}>
                <Input
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t('enterUsername')}
                  status={formik.touched.name && formik.errors.name ? 'error' : ''}
                />
                {formik.touched.name && formik.errors.name && (
                  <span style={{ color: 'red' }}>{formik.errors.name}</span>
                )}
              </Form.Item>

              <Form.Item label={t('Email')} required style={{marginBottom:10}}>
                <Input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t('enterEmail')}                  status={formik.touched.email && formik.errors.email ? 'error' : ''}
                />
                {formik.touched.email && formik.errors.email && (
                  <span style={{ color: 'red' }}>{formik.errors.email}</span>
                )}
              </Form.Item>

              <Form.Item label={t('Password')} required style={{marginBottom:10}}>
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

              <Form.Item label={t('Confirm Password')} required style={{marginBottom:10}}>
                <Input.Password
                  name="password_confirmation"
                  value={formik.values.password_confirmation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t('confirmPassword')}
                  status={formik.touched.password_confirmation && formik.errors.password_confirmation ? 'error' : ''}
                />
                {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                  <span style={{ color: 'red' }}>{formik.errors.password_confirmation}</span>
                )}
              </Form.Item>

              <Form.Item>
                <Button onClick={nextStep} type="primary" block className="banner-button" style={{marginTop:0}}>
                  {t('Next')}
                </Button>
              </Form.Item>
            </>
          )}

          {currentStep === 1 && (
            <>
              <Form.Item label={t('Phone')} required style={{marginBottom:10}}>
                <Input
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t('enterPhone')}
                  status={formik.touched.phone && formik.errors.phone ? 'error' : ''}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <span style={{ color: 'red' }}>{formik.errors.phone}</span>
                )}
              </Form.Item>

              <Form.Item label={t('Country')} required  style={{marginBottom:10}}>
                <Select
                  name="country"
                  value={formik.values.country}
                  onChange={(value) => formik.setFieldValue('country', value)}
                  onBlur={formik.handleBlur}
                  placeholder={t('selectCountry')}
                  status={formik.touched.country && formik.errors.country ? 'error' : ''}
                >
                  <Option value="usa">USA</Option>
                  <Option value="egypt">Egypt</Option>
                  <Option value="uk">UK</Option>
                </Select>
                {formik.touched.country && formik.errors.country && (
                  <span style={{ color: 'red' }}>{formik.errors.country}</span>
                )}
              </Form.Item>

              <Form.Item label={t('City')} required style={{marginBottom:10}}>
                <Input
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t('enterCity')}
                  status={formik.touched.city && formik.errors.city ? 'error' : ''}
                />
                {formik.touched.city && formik.errors.city && (
                  <span style={{ color: 'red' }}>{formik.errors.city}</span>
                )}
              </Form.Item>

              <Form.Item label={t('Gender')} required style={{marginBottom:10}}>
                <Select
                  name="gender"
                  value={formik.values.gender}
                  onChange={(value) => formik.setFieldValue('gender', value)}
                  onBlur={formik.handleBlur}
                  placeholder={t('selectGender')}
                  status={formik.touched.gender && formik.errors.gender ? 'error' : ''}
                >
                  <Option value="male">{t('male')}</Option>
                  <Option value="female">{t('female')}</Option>
                </Select>
                {formik.touched.gender && formik.errors.gender && (
                  <span style={{ color: 'red' }}>{formik.errors.gender}</span>
                )}
              </Form.Item>

              <Form.Item>
  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px",alignItems:'flex-end',marginTop:0 }}>
    <Button onClick={prevStep} type="primary" className="banner-button">
    {t('back')}

    </Button>
    <Button type="primary" className="banner-button" htmlType="submit" loading={isLoading}
    >
      {t('finish')}
    </Button>
  </div>
</Form.Item>

            </>
          )}

          <Space direction="horizontal"  style={{ width: '100%', textAlign: 'center' }}>
            <Button type="link" className = "link-auth" href="/login" style={{ padding: 0,marginTop:0 }}>
              {t('haveAccount')}
            </Button>
          </Space>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
