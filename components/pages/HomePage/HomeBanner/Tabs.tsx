import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../../../common/Button/Button";
import "./style.scss";
import { useTheme } from "@/lib/ThemeContext";

interface Tabs {
  ImgDesk: string;
  ImgMob: string;
  ImgLogo: string;
  title: string;
  id: string;
  text: string;
  color: string;
  buttonName: string;
}

interface TabsWithImagesProps {
  tabData: Tabs[];
}

const TabsWithImages: React.FC<TabsWithImagesProps> = ({ tabData }) => {
  const [activeTab, setActiveTab] = useState(tabData[0]?.id || "");
  const [search, setSearch] = useState("");
  const { color, setColor } = useTheme();

  // Set default active tab when tabData is available
  useEffect(() => {
    if (tabData.length > 0 && !activeTab) {
      setActiveTab(tabData[0].id);
    }
  }, [tabData, activeTab]);

  return (
    <div className="tab-section">
      <div className="tab-content mt-3 border p-3 rounded">
        {tabData
          .filter((tab) => tab.id === activeTab) // ✅ Only render active tab
          .map((tab) => (
            <div key={tab.id} className="tab-pane fade show active">
              <div className="banner-item">
                <div className="image-container">
                  <picture>
                    <source srcSet={tab?.ImgDesk} media="(min-width: 992px)" />
                    <source srcSet={tab?.ImgMob} media="(max-width: 991px)" />
                    <Image
                      src={tab?.ImgDesk || tab?.ImgMob}
                      className="d-block w-100"
                      alt={tab?.text}
                      width={1920}
                      height={1080}
                      layout="responsive"
                    />
                  </picture>
                </div>
                <div className="detail-container">
                  <div className="detail-wrap">
                    <Image
                      src={tab?.ImgLogo}
                      width={900}
                      height={850}
                      alt={tab?.text}
                    />
                    <div className="home-content">
                      <p>{tab?.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="button-sec">
        <ul className="nav nav-tabs">
          {tabData.map((tab) => (
            <li className="nav-item" key={tab.id}>
              <button
                className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(tab.id), setColor(tab.color);
                }}
                style={{
                  backgroundColor:
                    activeTab === tab.id
                      ? tab.color
                      : "rgba(186, 186, 186, 0.65)",
                }}
                dangerouslySetInnerHTML={{ __html: tab.buttonName }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TabsWithImages;
