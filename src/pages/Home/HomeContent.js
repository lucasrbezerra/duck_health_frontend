import React from "react";
import styles from "../../styles/pages/Home.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

export default function HomeContent() {
  function scrollToSection(section) {
    document
      .getElementById(section)
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <div className={styles.logoImage}>
          <img
            onClick={() => scrollToSection("banner")}
            src="img/DuckHealth_PNG.png"
          ></img>
        </div>
        <div className={styles.headerContent}>
          <h2 onClick={() => scrollToSection("banner")}>Início</h2>
          <h2 onClick={() => scrollToSection("about")}>Sobre</h2>
          <h2 onClick={() => scrollToSection("exams")}>Exames</h2>
          <h2 onClick={() => scrollToSection("contacts")}>Contato</h2>
        </div>
      </header>
      <section id="banner" className={styles.banner}>
        <div className={styles.description}>
          <h1>Duck Health</h1>
          <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            lacinia euismod imperdiet. Pellentesque vel ultricies ante. lacinia
            euismod imperdiet. ultricies ante.
          </h3>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className={styles.buttonAccess}>
              <i className="fas fa-file-contract"></i>
              Acessar Laudos
            </button>
          </Link>
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
      <section id="about" className={styles.about}>
        <div className={styles.gallery}>
          <Carousel
            styles={{ background: "red" }}
            autoPlay={true}
            interval={2500}
            infiniteLoop={true}
          >
            <div>
              <img src="/img/doctor.jpg" />
            </div>
            <div>
              <img src="/img/doctors.jpg" />
            </div>
            <div>
              <img src="/img/doctors2.jpg" />
            </div>
          </Carousel>
          <img
            className={styles.circleAbout}
            src="/img/circle-pattern.svg"
            alt="pattern"
          />
        </div>
        <div className={styles.aboutText}>
          <h2>Sobre Nós</h2>
          <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            sollicitudin, sapien id suscipit suscipit, urna ex sodales ante, nec
            convallis nibh nisi a nibh. Aenean rutrum dui id dui varius, et
            consequat risus congue. Pellentesque maximus eu arcu a maximus. Cras
            ac diam pharetra, tincidunt nunc ac, mattis dolor. Donec ullamcorper
            arcu et vestibulum tincidunt. Mauris finibus lacus vitae accumsan
            euismod. Nullam ut eros sit amet sapien malesuada iaculis
            condimentum scelerisque elit. Maecenas non ipsum nec massa rutrum
            viverra. Nulla facilisi.
          </h3>
        </div>
      </section>
      <section id="exams" className={styles.exams}>
        <h2 className={styles.titleExam}>Exames</h2>
        <div className={styles.first}>
          <div className={styles.exam1}>
            <img src="/img/exames/exame-sangue.png" alt="sangue" />
            <p>
              {" "}
              <span className={styles.spans}>Exames</span> laboratorias em
              geral.
            </p>
          </div>
          <div className={styles.exam2}>
            <img src="/img/exames/Raio-X.jpg" alt="raio-x" />
            <p>
              <span className={styles.spans}>Raio-x </span>é um exame não
              invasivo para detecção de alteração da estrutura ossea
            </p>
          </div>
          <div className={styles.exam3}>
            <img src="/img/exames/teste-covid.jpg" alt="covid" />
            <p>
              {" "}
              <span className={styles.spans}>Covid-19:</span> Testes rápido e de
              sangue.
            </p>
          </div>
        </div>
        <div className={styles.second}>
          <div className={styles.exam4}>
            <img src="/img/exames/ressonancia.jpg" alt="ressonancia" />
            <p>
              <span className={styles.spans}>Ressonância </span>é um exame de
              imagem capaz de mostrar com definição as estruturas internas dos
              órgãos.
            </p>
          </div>
          <div className={styles.exam5}>
            <img src="/img/exames/ultrasson.png" alt="ultrasson" />
            <p>
              <span className={styles.spans}>Ultrassom</span> é um exame de
              imagem diagnóstico que serve para visualizar em tempo real
              qualquer órgão ou tecido do corpo.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.address}>
        <img
          className={styles.circleAddress}
          src="/img/circle-pattern.svg"
          alt="pattern"
        />
        <div className={styles.detailsAddress}>
          <h2 className={styles.addressText}>Endereço</h2>
          <div className={styles.icons}>
            <i className="fas fa-hospital"></i>
            <p>Rua dos Doidões, Bairro Muito Doido, N° 127</p>
          </div>
          <div className={styles.icons}>
            <i className="fas fa-temperature-low"></i>
            <p>Ambiente climatizado, para o seu conforto ao atende-lo!</p>
          </div>
          <div className={styles.icons}>
            <i className="fas fa-futbol"></i>
            <p>Sala com brinquedos e passa-tempo para as crianças!</p>
          </div>
        </div>
        <div className={styles.maps}>
          <img src="/img/maps.jpg" alt="mapa" />
        </div>
      </section>
      <section id="contacts" className={styles.contacts}>
        <div className={styles.email}>
          <div className={styles.topEmail}>
            <input placeholder="Nome" />
            <input placeholder="Email" />
          </div>
          <div className={styles.bottomEmail}>
            <textarea placeholder="Como podemos ajudar? Escreva sua dúvida!" />
          </div>
          <button className={styles.sendEmail}>Enviar Mensagem</button>
        </div>
        <div className={styles.social}>
          <h2>Contatos</h2>
          <div className={styles.icons}>
            <i className="fas fa-phone"></i>
            <p>(67) 0000-0000 ou (67) 0000-0000</p>
          </div>
          <div className={styles.icons}>
            <i className="fab fa-instagram"></i>
            <p>@Duck_Health</p>
          </div>
          <div className={styles.icons}>
            <i className="fab fa-facebook"></i>
            <p>Duck Health</p>
          </div>
          <div className={styles.icons}>
            <i className="fab fa-linkedin"></i>
            <p>Clinica Duck Health</p>
          </div>
        </div>
      </section>
      <section className={styles.footer}>
        <img
          onClick={() => scrollToSection("banner")}
          src="/img/DuckHealth_PNG.png"
          alt="logo"
        />
      </section>
    </div>
  );
}
