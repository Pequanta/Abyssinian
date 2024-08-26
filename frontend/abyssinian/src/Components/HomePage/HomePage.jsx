import styles from "./homepage.module.css";
import FeacturingCard from "./FeaturingCard";
import ReadTrend from "../TrendPage/ReadTrend.jsx";
import { useState } from "react";
function HomePage() {
  const [mainPage, setMainPage] = useState(true);
  const [readPage, setReadPage] = useState(false);
  const openPostFunction = (event) => {
    setMainPage(false);
    setReadPage(true);
  };

  const backFromTrend = (event) => {
    setMainPage(true);
    setReadPage(false);
  };
  return (
    <div className={styles.mainHomePage}>
      {mainPage && (
        <div className={styles.pageCard}>
          <h2 className={styles.featureHeading}>Popular Trends</h2>
          <div className={styles.featureTrends}>
            <div className={styles.trendDisplay}>
              <FeacturingCard openPostFunction={openPostFunction} />
              <FeacturingCard openPostFunction={openPostFunction} />
              <FeacturingCard openPostFunction={openPostFunction} />
              <FeacturingCard openPostFunction={openPostFunction} />
            </div>
          </div>
        </div>
      )}
      {readPage && (
        <div className={styles.readingPage}>
          <ReadTrend backFromTrend={backFromTrend} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
