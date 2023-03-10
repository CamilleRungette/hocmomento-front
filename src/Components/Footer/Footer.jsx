import { AiFillFacebook, AiOutlineInstagram, AiFillYoutube, AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  const copyLink = () => {
    let address = "hocmomentotheatre@gmail.com";
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="footer-main">
      <div>
        <ul className="footer-list no-list-style">
          <li>
            <a href="https://www.facebook.com/hoc.momento">
              <AiFillFacebook className="network-icon" color="#555555" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/hoc.momento/?hl=fr">
              <AiOutlineInstagram className="network-icon instagram" color="#555555" />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCbv1zETvGrn4UORGvpyhZMA">
              <AiFillYoutube className="network-icon" color="#555555" />
            </a>
          </li>
          <li>
            <AiOutlineMail onClick={copyLink} className="network-icon" color="#555555" />
          </li>
        </ul>
      </div>
      <p> Hoc Momento - 2022</p>
    </div>
  );
};

export default Footer;
