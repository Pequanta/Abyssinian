import styles from "./homepage.module.css";
import FeacturingCard from "./FeaturingCard";
import ReadTrend from "../TrendPage/ReadTrend.jsx";
import { useState } from "react";
import imga from "../../assets/a.jpg"
import imgb from "../../assets/b.jpg"
import imgc from "../../assets/c.jpg"
import imgd from "../../assets/d.jpg"
import imge from "../../assets/e.jpg"
import imgf from "../../assets/f.jpg"

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
        <>
        <div className={styles.introCard}>
          <h1>Welcome to IziSefer</h1>
          <p>
            This is Where similar minds are gathered to
          </p>
          <ul>
            <li>Discuss Ideas</li>
            <img src={imga}/>
            <li>have reasonable debate</li>
            <img src={imgf}/>
            <li>give advices</li>
            <img src={imgb}/>
            <li>share and exchange trends</li>
            <img src={imga}/>
          </ul>
          
          <h2>So Buckle Up! its just one click away!</h2>
        </div>
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
        </>
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
