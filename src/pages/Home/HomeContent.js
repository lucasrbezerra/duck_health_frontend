import React from "react";
import styles from "../../styles/pages/Home.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function HomeContent() {
  const images = [
    "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  ];

  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <div className={styles.logoImage}>
          <img src="img/DuckHealth_PNG.png"></img>
        </div>
        <div className={styles.headerContent}>
          <h2>Início</h2>
          <h2>Sobre</h2>
          <h2>Exames</h2>
          <h2>Contato</h2>
        </div>
      </header>
      <section className={styles.banner}>
        <div className={styles.description}>
          <h1>Duck Health</h1>
          <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            lacinia euismod imperdiet. Pellentesque vel ultricies ante. lacinia
            euismod imperdiet. ultricies ante.
          </h3>
          <button className={styles.buttonAccess}>
            <i className="fas fa-file-contract"></i>
            Acessar Laudos
          </button>
        </div>
        <img
          className={styles.circle}
          src="/img/circle-pattern.svg"
          alt="pattern"
        />
        <img
          className={styles.imageBanner}
          src="/img/bg-banner.png"
          alt="banner"
        />
      </section>
      <section className={styles.about}>
        <div className={styles.gallery}>
          <Carousel styles={{background: 'red'}} autoPlay={true} interval={2500} infiniteLoop={true}>
            <div>
              <img src="/img/doctor.jpg"/>
            </div>
            <div >
              <img src="/img/doctors.jpg"/>
            </div>
            <div>
              <img src="/img/doctors2.jpg"/>
            </div>
          </Carousel>
          <img
            className={styles.circleAbout}
            src="/img/circle-pattern.svg"
            alt="pattern"
            />
        </div>
      </section>
    </div>
  );
}
