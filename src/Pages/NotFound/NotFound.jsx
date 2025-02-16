import { useTranslation } from "react-i18next";

const NotFound = () => {
    const {i18n} = useTranslation()
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      flexDirection: 'column', 
      textAlign: 'center', 
      backgroundColor: '#f8f9fa', 
      color: '#333' 
    }}>
      <h1 style={{ fontSize: '5rem', margin: '0' }}>404</h1>
      <p style={{ fontSize: '1.5rem' }}>{i18n.language==="EN"?"This page not found":"هذه الصفحة غير موجودة"}</p>
    </div>
  );
}

export default NotFound;
