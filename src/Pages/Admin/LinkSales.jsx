import { Card, Typography, Alert } from "antd";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const LinkSales = () => {
  const { i18n } = useTranslation();
  const code = document.cookie.split('; ').find(row => row.startsWith('code='))?.split('=')[1];

  return (
    <div style={{ padding: "20px" }}>
<Alert
  message={'Your Link (اللينك الخاص بك)'}
  description={'Share this link with others to get more commission(شارك هذا الرابط مع الآخرين لتحصل على مزيد من العمولة).'}
  type="warning"
  showIcon
/>

        <Card style={{ textAlign: "center", marginTop: "20px" }}>
          <Text copyable style={{ fontSize: "18px", fontWeight: "bold", color: "#1890ff" }}>
            http://localhost:5173/?ref={code}
          </Text>
        </Card>
      
    </div>
  );
};

export default LinkSales;
