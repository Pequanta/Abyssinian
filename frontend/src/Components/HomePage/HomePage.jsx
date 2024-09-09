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
        <h1 className={styles.welcomeText}>Welcome to እዚSefer</h1>
        <div className={styles.introCard}>
          <p>
            This is Where everyone gather to
          </p>
          <ul>
            <li>
              <h3>Discuss Ideas</h3>
              <img src={imga}/>
            </li>
            <li>
              <h3>have reasonable debate</h3>
              <img src={imgf}/>
            </li>
            <li>
              <h3>give advices</h3>
              <img src={imgb}/>
            </li>
            <li>
              <h3>share and exchange trends</h3>
              <img src={imgc}/>
            </li>
          </ul>
          
          <h2 className={styles.buckleMessage}>So Buckle Up! its just one click away! Or ....</h2>
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
