import styles from "./trendpage.module.css";
import { useState, useEffect } from "react";
import FeacturingCard from "../HomePage/FeaturingCard";
import TrendList from "./TrendList";
import NewTrend from "./NewTrend";
import ReadTrend from "./ReadTrend";


function TrendsPage(props) {
  const [trendsList, setTrendsList] = useState([]);
  const [trendDisplayed , setTrendDisplayed] = useState();
  const [trendPosition , setTrendPosition] = useState("current-main")
  useEffect(() => {
    const fetchTrends = async () =>{
        const response = await fetch(`${props.backendHttpUrl}/trends/get-all-trends`,
          {method: "get"}
        );
        const result = response.json();
        result.then(content =>{
          setTrendsList(content["message"])

        })
      }
      fetchTrends();
    }
      
      ,[trendPosition])
  const [mainPage, setMainPage] = useState(true);
  const [readTrend, setReadTrend] = useState(false);
  const [newTrend, setNewTrend] = useState(false);

  const backFromTrend = (event) => {
    setMainPage(true);
    setReadTrend(false);
  };
  const backFromNewTrend = (event) => {
    setMainPage(true);
    setNewTrend(false);
  };

  const openTrend = (event, trend) => {
    console.log(trend);
    setTrendDisplayed(trend)
    setMainPage(false);
    setReadTrend(true);
  };
  const openNewTrend = (event) => {
    console.log(trendsList)
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
              {
                trendsList.map((trend, index) =>(
                  <TrendList key={index} openTrend={openTrend} trend={trend}/>
                ))
              }
            </div>
          </div>
        </div>
      )}
      {!mainPage && readTrend && <ReadTrend backFromTrend={backFromTrend} trend={trendDisplayed} setTrendPosition={setTrendDisplayed} currentActiveUser={props.currentActiveUser} backendHttpUrl={props.backendHttpUrl}/> }
      {!mainPage && newTrend && (
        <NewTrend backFromNewTrend={backFromNewTrend} currentActiveUser={props.currentActiveUser} setTrendPosition={setTrendPosition} backendHttpUrl={props.backendHttpUrl} />
      )}
    </div>
  );
}

export default TrendsPage;
