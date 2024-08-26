import styles from "./trendpage.module.css";
import { useState, useEffect } from "react";
import FeacturingCard from "../HomePage/FeaturingCard";
import TrendList from "./TrendList";
import NewTrend from "./NewTrend";
import ReadTrend from "./ReadTrend";

function TrendsPage() {
  //     useEffect(
  //         function fetchAllTrends(){
  //             const fetchTrends = async () =>{
  //                 const response = fetch(``)
  //             }
  //         }
  //         ,[])
  const [mainPage, setMainPage] = useState(true);
  const [readTrend, setReadTrend] = useState(false);
  const [newTrend, setNewTrend] = useState(false);
  console.log(readTrend);
  console.log(mainPage);

  const backFromTrend = (event) => {
    setMainPage(true);
    setReadTrend(false);
  };
  const backFromNewTrend = (event) => {
    setMainPage(true);
    setNewTrend(false);
  };

  const openTrend = (event) => {
    setMainPage(false);
    setReadTrend(true);
  };
  const openNewTrend = (event) => {
    setMainPage(false);
    setNewTrend(true);
  };
  return (
    <div className={styles.trendPageContainer}>
      {mainPage && (
        <div className={styles.mainPageElements}>
          <h1 className={styles.pageHeading}>Nerd Trends</h1>
          <hr className={styles.titleLine} id="main-page-elements"></hr>
          <form className={styles.searchTrends} id="main-page-elements">
            <input type="text" placeholder="🔍 search trend..." />
            <button>Search</button>
          </form>
          <div className={styles.trendsListing} id="main-page-elements">
            <div className={styles.trendListHeaders}>
              <span className={styles.pageHeading}> Trends</span>
              <div className={styles.newTrendButton}>
                <button onClick={(event) => openNewTrend(event)}>
                  +New Trend
                </button>
              </div>
            </div>

            <div className={styles.trendsListing}>
              <TrendList openTrend={openTrend} />
              <TrendList openTrend={openTrend} />
              <TrendList openTrend={openTrend} />
              <TrendList openTrend={openTrend} />
              <TrendList openTrend={openTrend} />
              <TrendList openTrend={openTrend} />
            </div>
          </div>
        </div>
      )}
      {!mainPage && readTrend && <ReadTrend backFromTrend={backFromTrend} />}
      {!mainPage && newTrend && (
        <NewTrend backFromNewTrend={backFromNewTrend} />
      )}
    </div>
  );
}

export default TrendsPage;
