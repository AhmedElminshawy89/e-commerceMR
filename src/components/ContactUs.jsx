import { Form, Input, Button } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import '../Style/ContactUs.css';

const ContactUs = () => {
  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <div className="contact-us-container">
      <div className='contact-top'>
        <div className="info-boxes">
          <div className="info-box">
            <EnvironmentOutlined className="icon" />
            <div>
              <h3>Our Address</h3>
              <p>123 Street Name, City, Country</p>
            </div>
          </div>
          <div className="info-box">
            <PhoneOutlined className="icon" />
            <div>
              <h3>Phone Number</h3>
              <p>+123 456 7890</p>
            </div>
          </div>
          <div className="info-box">
            <MailOutlined className="icon" />
            <div>
              <h3>Email Address</h3>
              <p>info@example.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Contact Us</h2>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="name"
              label="Your Name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: 'Please enter your message!' }]}
            >
              <Input.TextArea rows={5} placeholder="Enter your message" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className='banner-button'>
              Submit
            </Button>
          </Form>
        </div>
      </div>

      <div className="map">
        <h2>Find Us Here</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434508616!2d144.95373531590495!3d-37.816279742021996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5772f21e3664c27!2s123%20Street%20Name%2C%20City%2C%20Country!5e0!3m2!1sen!2s!4v1612345678901"
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
