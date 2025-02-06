import { memo } from "react";
import { useShowAdvertiseQuery } from "../app/Api/Advertising";
import "../Style/Banner2.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Banner2 = () => {
  const { data: advertising, isLoading, error } = useShowAdvertiseQuery();
  if(advertising?.advertise?.length === 0) return null;
  if(error) return null;

  return (
    <div>
      {isLoading ? (
        Array(1).fill().map((_, index) => (
          <div className="banner2-container banner-container" key={index}>
            <Skeleton height={300} width="100%" />
            <div className="banner2-content" >
              <Skeleton width="100%" height={20} style={{ marginBottom: "15px" }} />
              <Skeleton width="60%" height={10} style={{ marginBottom: "0px" }} />
              <Skeleton width="60%" height={10} style={{ marginBottom: "0px" }} />
              <Skeleton width="60%" height={10} style={{ marginBottom: "10px" }} />
              <Skeleton width={120} height={30} />
            </div>
          </div>
        ))
      ) : (
        advertising?.advertise?.map((advertise, index) => (
          <div
            key={index}
            className="banner2-container banner-container"
            style={{ backgroundImage: `url(${advertise?.image})` }}
          >
            <div className="banner2-content">
              <h2 className="banner2-title">{advertise?.tittle}</h2>
              <p className="banner2-description">{advertise?.desc}</p>
              <button
                className="banner2-button"
                // onClick={() => window.open(advertise.link_btn,'')}
                onClick={() => window.location.href = advertise.link_btn}
              >
                {advertise?.name_btn}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default memo(Banner2);
