import { Form, Input, Button, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import '../Style/ContactUs.css';
import { useSaveContactMutation } from '../app/Api/Contact';
import { useTranslation } from 'react-i18next';
import TitleSection from '../Shared/TitleSection';
import { useShowAllAdminOverAllInfoQuery } from "../app/Api/SiteDetails";

const ContactUs = () => {
  const [form] = Form.useForm(); 
  const [saveContact, { isLoading }] = useSaveContactMutation();
  const { i18n } = useTranslation();
  const { data: Info } = useShowAllAdminOverAllInfoQuery();

  const onFinish = async (values) => {
    try {
      await saveContact(values);
      message.success(i18n.language === "EN" ? "Contact saved successfully!" : "تم حفظ بياناتك بنجاح!");
      form.resetFields();
    } catch (error) {
      message.error(i18n.language === "EN" ? "Failed to save contact. Please try again." : "فشل في حفظ البيانات. حاول مرة أخرى.");
    }
  };

  return (
    <div className="contact-us-container">
      <div className='contact-top'>
        <div className="info-boxes">
          <div className="info-box">
            <EnvironmentOutlined className="icon" />
            <div>
              <h3>Our Address</h3>
              <p>{Info?.info?.map((e) => e?.address)}</p>
            </div>
          </div>
          <div className="info-box">
            <PhoneOutlined className="icon" />
            <div>
              <h3>Phone Number</h3>
              <p>
                {Info?.info?.map((e, index) => (
                  <a key={index} href={`tel:${e.phone}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {e.phone}
                  </a>
                ))}
              </p>
            </div>
          </div>
          <div className="info-box">
            <MailOutlined className="icon" />
            <div>
              <h3>Email Address</h3>
              <p>
                {Info?.info?.map((e, index) => (
                  <a key={index} href={`mailto:${e.email}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {e.email}
                  </a>
                ))}
              </p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <TitleSection title={i18n.language === "EN" ? "Contact Us" : "تواصل معنا"} />
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="name"
              label={i18n.language === "EN" ? "Your Name" : "اسمك"}
              rules={[{ required: true, message: i18n.language === "EN" ? 'Please enter your name!' : "من فضلك ادخل اسمك" }]}
            >
              <Input placeholder={i18n.language === "EN" ? "Enter your name" : "أدخل اسمك"} />
            </Form.Item>
            <Form.Item
              name="email"
              label={i18n.language === "EN" ? "Email Address" : "البريد الالكتروني"}
              rules={[
                { required: true, message: i18n.language === "EN" ? 'Please enter your email!' : "من فضلك ادخل بريدك الالكتروني" },
                { type: 'email', message: i18n.language === "EN" ? 'Please enter a valid email!' : "الرجاء إدخال بريد إلكتروني صالح!" },
              ]}
            >
              <Input placeholder={i18n.language === "EN" ? "Enter your email" : "أدخل بريدك الإلكتروني"} />
            </Form.Item>
            <Form.Item
              name="message"
              label={i18n.language === "EN" ? "Message" : "الرسالة"}
              rules={[{ required: true, message: i18n.language === "EN" ? 'Please enter your message!' : "الرجاء إدخال رسالتك!" }]}
            >
              <Input.TextArea rows={5} placeholder={i18n.language === "EN" ? "Enter your message" : "أدخل رسالتك"} />
            </Form.Item>
            <Button type="primary" loading={isLoading} htmlType="submit" className='banner-button'>
              {i18n.language === "EN" ? "Submit" : "إرسال"}
            </Button>
          </Form>
        </div>
      </div>

      <div className="map">
        <TitleSection title={i18n.language === "EN" ? "Find us here" : "تجدنا هنا"} />
        <iframe
          src={Info?.info?.map((e) => e?.linkMap)}
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
          title="Google Maps"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
