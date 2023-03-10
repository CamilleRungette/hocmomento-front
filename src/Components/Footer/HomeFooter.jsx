import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { AiFillFacebook, AiOutlineInstagram, AiFillYoutube, AiOutlineMail } from "react-icons/ai";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "../Alert/Alert";
import url from "../../url";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const HomeFooter = () => {
  const alertRef = useRef();

  const [isVerified, setIsVerified] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [alert, setAlert] = useState({
    severity: "success",
    message: "",
  });
  const [size, setSize] = useState(0);

  const theme = createTheme({
    typography: {
      fontFamily: ["Josefin Sans", "sans-serif"].join(","),
    },
  });

  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {}, [size]);

  const copyLink = () => {
    let address = "hocmomentotheatre@gmail.com";
    navigator.clipboard.writeText(address);
    setAlert({
      severity: "success",
      message: "L'adresse email est copiée dans le presse-papier",
    });
    alertRef.current.showAlert();
  };

  const handleState = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const saveMessage = (e) => {
    e.preventDefault();
    if (values.name && values.email && values.message) {
      if (isVerified) {
        axios
          .post(`${url}/messages/create-message`, values)
          .then(() => {
            setAlert({
              severity: "success",
              message: "Votre message a bien été envoyé",
            });
            alertRef.current.showAlert();
            setIsVerified(false);
            setValues({
              name: "",
              email: "",
              message: "",
            });
          })
          .catch((err) => {
            setAlert({
              severity: "error",
              message: "Erreur avec l'envoi de votre message, veuillez retenter plus tard",
            });
            alertRef.current.showAlert();
          });
      } else {
        setAlert({
          severity: "error",
          message: "Vous devez valider la captcha",
        });
        alertRef.current.showAlert();
      }
    } else {
      setAlert({
        severity: "warning",
        message: "Vous devez remplir tous les champs du formulaire",
      });
      alertRef.current.showAlert();
    }
  };

  const verifyCallback = (response) => {
    if (response) setIsVerified(true);
  };

  return (
    <div className="home-footer-main">
      <Alert ref={alertRef} alertInfos={alert} />
      <div className="links">
        <div className="credits link-part">
          <div className="inside">
            <h2>Crédits Photos</h2>
            <ul className="footer-home-list no-list-style ">
              <li>Marie Doreaux</li>
              <li>Yvan Loiseau</li>
              <li>Piero Oronzo</li>
              <li>Ariane Descoueyte</li>
              <li>Aiman Saad Ellaoui</li>
            </ul>
            <div className="div-logo">
              <img alt="Hoc Momento" src="/images/logo_noir.png" />
            </div>
          </div>
        </div>
        <div className="social-networks link-part">
          <div className="inside">
            <h2> Réseaux sociaux</h2>
            <ul className="footer-home-list no-list-style">
              <li>
                <AiFillFacebook className="network-icon" color="#555555" />
                <a
                  className="link network"
                  href="https://www.facebook.com/hoc.momento"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <AiOutlineInstagram className="network-icon instagram" color="#555555" />
                <a
                  className="link network"
                  href="https://www.instagram.com/hoc.momento"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <AiFillYoutube className="network-icon" color="#555555" />
                <a
                  className="link network"
                  href="https://www.youtube.com/channel/UCbv1zETvGrn4UORGvpyhZMA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Youtube
                </a>
              </li>
              <li>
                <AiOutlineMail className="network-icon" color="#555555" />
                <span className="network pointer" onClick={copyLink}>
                  hocmomentotheatre@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="contact link-part">
          <h2> Contactez-nous</h2>
          <ThemeProvider theme={theme}>
            <Box component="form" className="contact-form">
              <TextField
                id="name"
                label="Nom"
                size="small"
                className="contact-input"
                value={values.name}
                onChange={handleState("name")}
              />
              <TextField
                id="email"
                label="Email"
                size="small"
                className="contact-input"
                value={values.email}
                onChange={handleState("email")}
              />
              <TextField
                id="message"
                label="Message"
                multiline
                size="small"
                value={values.message}
                rows={4}
                className="contact-input"
                onChange={handleState("message")}
              />
              <div className="captcha">
                <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_CAPTCHA} onChange={verifyCallback} />
              </div>
              <button className="primary-button" onClick={(e) => saveMessage(e)}>
                Envoyer
              </button>
            </Box>
          </ThemeProvider>
        </div>
      </div>

      <div className="supports-partners ">
        <div className="footer-logo">
          <img alt="Drac" src="/images/logos/logo_drac.png" />
        </div>
        <div className="footer-logo">
          <img alt="Ville de Saint-Denis" src="/images/logos/logo_saint_denis.png" />
        </div>
        {/* <div className='footer-logo'>
          <img alt="Ville de Saint-Ouen" src='/images/logos/logo_saint_ouen.png' />
        </div> */}
        <div className="footer-logo">
          <img alt="Adami" src="/images/logos/logo_adami.png" />
        </div>
        <div className="footer-logo">
          <img alt="Campus Condorcet" src="/images/logos/logo_condorcet.png" />
        </div>
        <div className="footer-logo">
          <img alt="Mains d'Oeuvres" src="/images/logos/logo_mains_doeuvres.png" />
        </div>
      </div>

      <div className="end-paragraph">
        <p>Hoc Momento - 2022</p>
      </div>
    </div>
  );
};

export default HomeFooter;
