import { 
    FaFacebook, 
    FaTwitter, 
    FaInstagram, 
    FaYoutube, 
    FaEnvelope, 
    FaAngleRight 
  } from "react-icons/fa";
  import { useTranslation } from "react-i18next";
  import {
    StyleFooter,
    AllDivs,
    FooterColumn,
    IconsDiv,
    FooterLink,
    FooterUl,
    FooterLi,
    FooterBottom
  } from "../components/styles/layouts/Footer.styled";
  // Import the new animated heart
  import { BeatingHeart } from "../components/styles/layouts/Footer.styled";
  
  export function Footer() {
    const { t } = useTranslation();
  
    return (
      <StyleFooter>
        <AllDivs>
          <FooterColumn>
            <img style={{ width: "220px" }} src="/DIGINOU-LOGO-CROPPED.png" alt="DIGINOU Logo" />
            <p style={{ color: "#cdde00" }}>
              Diginou is your ultimate digital menu solution, revolutionizing the way you showcase your offerings to your customers.
            </p>
          </FooterColumn>
          <FooterColumn>
            <h2 style={{ marginTop: "0px", color: "#cdde00" }}>Useful Links</h2>
            <FooterUl>
              <FooterLi>
                <FaAngleRight style={{ marginRight: "12px" }} />
                <a href="https://diginou.com/" target="_blank" rel="noopener noreferrer">
                  HOME
                </a>
              </FooterLi>
              <FooterLi>
                <FaAngleRight style={{ marginRight: "12px" }} />
                <a href="https://diginou.com/about/" target="_blank" rel="noopener noreferrer">
                  ABOUT
                </a>
              </FooterLi>
              <FooterLi>
                <FaAngleRight style={{ marginRight: "12px" }} />
                <a href="https://diginou.com/benefits/" target="_blank" rel="noopener noreferrer">
                  BENEFITS
                </a>
              </FooterLi>
              <FooterLi>
                <FaAngleRight style={{ marginRight: "12px" }} />
                <a href="https://diginou.com/pricing/" target="_blank" rel="noopener noreferrer">
                  PRICING
                </a>
              </FooterLi>
              <FooterLi>
                <FaAngleRight style={{ marginRight: "12px" }} />
                <a href="https://diginou.com/faq/" target="_blank" rel="noopener noreferrer">
                  FAQ
                </a>
              </FooterLi>
              <FooterLi>
                <FaAngleRight style={{ marginRight: "12px" }} />
                <a href="https://diginou.com/contact/" target="_blank" rel="noopener noreferrer">
                  CONTACT
                </a>
              </FooterLi>
            </FooterUl>
          </FooterColumn>
          <FooterColumn>
            <h2 style={{ marginTop: "0px", color: "#cdde00" }}>Social Media</h2>
            <IconsDiv>
              <FaFacebook size={22} />
              <FaTwitter size={22} />
              <FaInstagram size={22} />
              <FaYoutube size={22} />
            </IconsDiv>
          </FooterColumn>
          <FooterColumn>
            <h2 style={{ marginTop: "0px", color: "#cdde00" }}>Contact</h2>
            <FooterLink href="mailto:info@diginou.com">
              <FaEnvelope style={{ marginRight: "10px" }} />
              info@diginou.com
            </FooterLink>
          </FooterColumn>
        </AllDivs>
        <FooterBottom>
          Made with <BeatingHeart style={{ margin: "0 5px" }} /> Diginou
        </FooterBottom>
      </StyleFooter>
    );
  }
  