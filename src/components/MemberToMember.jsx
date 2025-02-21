import { Card, Typography, Alert, Spin } from "antd";
import TitleSection from "../Shared/TitleSection";
import { useTranslation } from "react-i18next";
import { useShowSingleUserQuery } from "../app/Api/Users";
import { useShowDiscountQuery } from "../app/Api/Discount";

const { Text, Paragraph } = Typography;

const MemberToMember = () => {
  const { i18n } = useTranslation();
  const { data: SingleUser, isLoading: userLoading } = useShowSingleUserQuery();
  const { data: discount, isLoading: discountLoading } = useShowDiscountQuery();

  const userCode = SingleUser?.user?.code;
  const discountValue = discount?.cashBack?.[0]?.cashback || 0; 
  const discountType = discount?.cashBack?.[0]?.type || "percent";

  if (userLoading || discountLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "120px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <TitleSection title={i18n.language === "EN" ? "Member Get Member" : "عضو احصل على عضو"} />

      {userCode ? (
        <Card style={{ textAlign: "center", marginTop: "20px" }}>
          <Paragraph strong>
            {i18n.language === "EN"
              ? `Share your referral code and enjoy a ${discountValue}${discountType === "percent" ? "%" : " LE"} discount!`
              : `شارك كود الإحالة الخاص بك واستمتع بخصم ${discountValue}${discountType === "percent" ? "%" : " LE"}!`}
          </Paragraph>
          <Text copyable style={{ fontSize: "18px", fontWeight: "bold", color: "#1890ff" }}>
            https://mr-elite.com/?ref={userCode}
          </Text>
          <Paragraph type="secondary" style={{ marginTop: "10px" }}>
            {i18n.language === "EN"
              ? `If your friend uses this code, you will get a ${discountValue}${discountType === "percent" ? "%" : " LE"} discount on your next order!`
              : `إذا استخدم صديقك هذا الكود، أنت ستحصل على خصم ${discountValue}${discountType === "percent" ? "%" : " LE"} على طلبك التالي!`}
          </Paragraph>
        </Card>
      ) : (
        <Alert
          message={
            i18n.language === "EN"
              ? "Make a purchase now to receive your referral code!"
              : "قم بالشراء الآن للحصول على كود الإحالة الخاص بك!"
          }
          description={
            i18n.language === "EN"
              ? "Once you have your code, you can share it with friends and earn discounts on your future orders!"
              : "بمجرد حصولك على الكود، يمكنك مشاركته مع الأصدقاء وكسب خصومات على طلباتك المستقبلية!"
          }
          type="info"
          showIcon
          style={{ marginTop: "20px" }}
        />
      )}
    </div>
  );
};

export default MemberToMember;
