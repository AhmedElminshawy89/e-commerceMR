import { message } from "antd";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineWifiOff, MdWifi } from "react-icons/md";

const OfflineNotice = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const {i18n} = useTranslation()
  useEffect(() => {
    const handleOnline = () => {
      message.destroy();
      setIsOnline(true);
      message.success({
        content: (
          <>
              {i18n.language==="EN"?"Internet connection has been restored":"تمت استعادة الاتصال بالإنترنت"}
            <span 
              initial={{ scale: 0.8, rotate: -10 }} 
              animate={{ scale: 1, rotate: 0 }} 
              transition={{ type: "spring", stiffness: 300 }}
            >
              <MdWifi style={{ color: "green", marginRight: 8 , fontSize:'22px'}} />
            </span>
          </>
        ),
        duration: 5,
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      message.warning({
        content: (
          <>
              {i18n.language==="EN"?"No internet connection":" لا يوجد اتصال بالإنترنت"}
            <span 
              initial={{ scale: 0.8, rotate: 10 }} 
              animate={{ scale: 1, rotate: 0 }} 
              transition={{ type: "spring", stiffness: 300 }}
            >
              <MdOutlineWifiOff style={{ color: "red", marginRight: 8 , fontSize:'22px'}} />
            </span>
          </>
        ),
        duration: 0,
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return null;
};

export default OfflineNotice;
