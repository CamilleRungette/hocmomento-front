import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Lines1 from "../Components/Lines/Lines1";
import Lines2 from "../Components/Lines/Lines2";

const Company = () => {
  return (
    <div>
      <Navbar />
      <div className="company-main">
        <div className="company-lines1">
          <Lines1 />
        </div>
        <div className="title">
          <h1>La Compagnie</h1>
        </div>
        <p>
          <span className="picture-div">
            <img className="picture" alt="La compagnie Hoc Momento" src="/images/company.jpg" />
          </span>{" "}
          <br />
          <strong>Hoc Momento </strong> est une compagnie internationale et pluridisciplinaire,
          spécialisée dans le théâtre in situ. <br />
          Composée de metteurs en scène, d’acteurs, de musiciens, de dramaturges et de scénographes,
          l’équipe artistique se rencontre dans son{" "}
          <span className="bold">désir de faire exploser les cadres</span>. <br /> <br />
          <span className="bold">
            L’envie de travailler dans des espaces qui ne soient pas dédiés au théâtre
          </span>{" "}
          : des espaces abandonnés ou vacants, des monuments délaissés, des friches.{" "}
          <span className="bold">Laisser la contrainte être motrice de création</span>. Penser à
          partir du contexte. En s'imprégnant dulieu, de son histoire. Comment théâtraliser une gare
          abandonnée ? Un terrain vague de 5000 m2 ? Combien faut-il d’acteurs pour les habiter ?{" "}
          <br /> <br />
          Depuis 2014, Hoc Momento réalise des résidences in situ au Brésil et en France.
          <br />À chaque résidence, l’équipe a créé{" "}
          <span className="bold">
            un spectacle déambulatoire, immersif et musical, mêlant de façon troublante le réel et
            la fiction
          </span>
          . Un spectacle conçu collectivement par tous les participants. <br />
          Souvent poétique. Parfois absurde et surréaliste. Toujours populaire. <br /> <br />
          Hoc Momento cherche à inventer un monde où la communauté pourrait voir incarnés ses
          propres mythes, dans une joyeuse épopée. Il y a, un rêve de tréteaux et de scène
          shakespearienne, d’agora et de procession carnavalesque... Le fantasme d’un théâtre ouvert
          à tous les vents où pourrait venir Reine de France ou simple badaud, et où tout le monde
          ressortirait bouffon. <br />
          <span className="bold">
            Le désir d’ouvrir au maximum la création et de la partager.
          </span>{" "}
          <br /> <br />
          On est nombreux, on parle plusieurs langues, les espaces sont grands et inspirants, les
          idées bouillonnent ... Pour chaque spectacle foisonnant de créativité, il y a une
          vingtaine de personnes impliquées : des artistes professionnels et des habitants. Ils
          improvisent, font des recherches, réfléchissent. L’équipe, réunie autour d’artistes
          permanents, se reconfigure à chaque résidence. <br /> <br />
          <span className="bold">
            Le souhait que par ces communautés artistiques éphémères, la ville soit un peu
            transformée.{" "}
          </span>{" "}
          <br />
          Un peu réinventée. Qu’on reconfigure, en faisant du théâtre, d’autres manières de vivre
          ensemble. <br />
          Simples. Mais bien réelles.
          <br />
          En construisant la scénographie, à partir de matériaux de récupération. <br />
          En invitant des groupes d’enfants à assister à des répétitions.
          <br />
          En collaborant avec les associations locales.
          <br />
          En mettant en commun des imaginaires.
          <br />
          Et que cela crée du lien.
          <br />
        </p>
      </div>

      <div className="company-lines2">
        <Lines2 />
      </div>
      <Footer />
    </div>
  );
};

export default Company;
