import styles from "./trendpage.module.css";
import { useState, useEffect } from "react";
import FeacturingCard from "./FeaturingCard";
import VlogList from "./TrendList";
import userPic from "../../assets/bp8.png";

function VlogsPage() {
  //     useEffect(
  //         function fetchAllVlogs(){
  //             const fetchVlogs = async () =>{
  //                 const response = fetch(``)
  //             }
  //         }
  //         ,[])

  const removeMainPageElements = () => {
    const elements = document.querySelectorAll("[id=main-page-elements]");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  };
  const makeVisibleMainPageElements = () => {
    const elements = document.querySelectorAll("[id=main-page-elements]");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "flex";
    }
  };
  const openPost = (event) => {
    const postElement = document.getElementById("postDiv");
    postElement.style.display = "flex";
    postElement.style.flexDirection = "column";
    postElement.style.textAlign = "justify";
    postElement.style.alignItems = "center";
  };
  const backFromPost = (event) => {
    document.getElementById("postDiv").style.display = "none";
  };

  const newTrendCreation = (event) => {
    removeMainPageElements();
    document.getElementById("newTrendDisplay").style.display = "block";
  };
  return (
    <div className={styles.vlogPageContainer}>
      <h1 className={styles.pageHeading} id="main-page-elements">
        Nerd Trends
      </h1>
      <hr className={styles.titleLine} id="main-page-elements"></hr>
      <form className={styles.searchVlogs} id="main-page-elements">
        <input type="text" placeholder="🔍 search trend..." />
        <button>Search</button>
      </form>
      <div className={styles.featureVlogs} id="main-page-elements">
        <h2 className={styles.featureHeading}>Popular Vlogs</h2>
        <div className={styles.vlogDisplay}>
          <FeacturingCard openPostFunction={(event) => openPost(event)} />
          <FeacturingCard openPostFunction={(event) => openPost(event)} />
          <FeacturingCard openPostFunction={(event) => openPost(event)} />
          <FeacturingCard openPostFunction={(event) => openPost(event)} />
        </div>
      </div>
      <div className={styles.vlogsListing} id="main-page-elements">
        <div className={styles.trendListHeaders}>
          <span className={styles.pageHeading}> Trends</span>
          <div className={styles.newTrendButton}>
            <button onClick={(event) => newTrendCreation(event)}>
              {" "}
              +New Trend
            </button>
          </div>
        </div>

        <div className={styles.vlogsListing}>
          <VlogList openPostFunction={(event) => openPost(event)} />
          <VlogList openPostFunction={(event) => openPost(event)} />
          <VlogList openPostFunction={(event) => openPost(event)} />
          <VlogList openPostFunction={(event) => openPost(event)} />
        </div>
      </div>
      <div className={styles.postDisplayCard} id="postDiv">
        <div className={styles.backButton}>
          <button onClick={(event) => backFromPost(event)}>⬅️Back</button>
        </div>
        <div className={styles.postHeadings}>
          <div className={styles.userInfo}>
            <img src={userPic} />
          </div>
          <div className={styles.postInfo}>
            <h3>Author: Peniel</h3>

            <h6>date: jul, 16, 2024 00:00:00pm</h6>
          </div>
        </div>
        <div className={styles.postContent}>
          <h3>
            Title: Lorem Ipsum is simply dummy text of the printing and
            typesetting industry.{" "}
          </h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
      </div>
      <div className={styles.newTrendPostDisplay} id="newTrendDisplay">
        <div className={styles.backButton}>
          <button onClick={(event) => backFromPost(event)}>⬅️Back</button>
        </div>
        <div className={styles.postContentHandlers}>
          <textarea className={styles.newPostContent} />
          <button className={styles.newPostButton}>post</button>
        </div>
      </div>
    </div>
  );
}

export default VlogsPage;
