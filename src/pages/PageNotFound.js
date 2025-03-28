import React from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { Container } from "../components/styles/Main.styled";
import ERROR_404_DIGINOU_LIGHT from "../components/styles/lotties/ERROR_404_DIGINOU_LIGHT.json";
import { 
  Div, 
  Overlay, 
  Content, 
  Message, 
  Button, 
  Divider, 
  SocialMedia, 
  SocialIcon 
} from "../components/styles/pages/PageNotFound.styled";
import { FaHome, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"; // Importing icons from react-icons

export function PageNotFound() {
  return (
    <Div>
      <Overlay />
      <Container>
        <Content>
          {/* Adjusted Lottie height so it doesn’t fill the entire viewport */}
          <Lottie 
            animationData={ERROR_404_DIGINOU_LIGHT} 
            loop={true} 
            style={{ width:"100%", height: "250px" }} 
          />

          <Message style={{marginTop:"-45px"}}>
            <h1>Η ΣΕΛΙΔΑ ΔΕΝ ΒΡΕΘΗΚΕ!!!</h1>
            <p>Κάτι πήγε στραβά! Η σελίδα που ψάχνετε δεν υπάρχει.</p>
          </Message>

          <Link to="/" style={{textDecoration:"none"}}>
            <Button>
              <FaHome style={{ marginRight: "8px" }} />
              <span>ΑΡΧΙΚΗ</span>
            </Button>
          </Link>


          <Divider>
            <span>Diginou</span>
          </Divider>

          <SocialMedia>
            <h2>SOCIAL MEDIA</h2>
            <div>
              <SocialIcon href="https://facebook.com" target="_blank" aria-label="Facebook">
                <FaFacebook />
              </SocialIcon>
              <SocialIcon href="https://twitter.com" target="_blank" aria-label="Twitter">
                <FaTwitter />
              </SocialIcon>
              <SocialIcon href="https://instagram.com" target="_blank" aria-label="Instagram">
                <FaInstagram />
              </SocialIcon>
              <SocialIcon href="https://youtube.com" target="_blank" aria-label="YouTube">
                <FaYoutube />
              </SocialIcon>
            </div>
          </SocialMedia>
        </Content>
      </Container>
    </Div>
  );
}
