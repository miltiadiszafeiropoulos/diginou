import { useContext } from "react";
import { StyledOffCanvas } from "styled-off-canvas";
import {
  MenuCanva,
  Header,
  Cancel,
  IconX,
  DivContainer,
  CustomOverlay,
  SocialIconLink,
  StyledLink
} from "./styles/StoreInformation.styled";
import { MenuContext } from "../context/MenuContext";
import StoreMap from "./StoreMap";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { DefaultImages } from "../constants/AppConstants";

export function StoreInformation(props) {
  const { menuInfo } = useContext(MenuContext);
  const store = menuInfo?.stores?.[0];
    const DEFAULT_IMAGE_URL_STORE = DefaultImages.DEFAULT_IMAGE_STORE;


  return (
    <StyledOffCanvas position="left" isOpen={props.isOpen} onClose={props.close}>
      <MenuCanva closeOnEsc>
        {/* Sticky header */}
        <Header>
          <h2>Πληροφορίες</h2>
          <Cancel onClick={props.close}>
            <IconX />
          </Cancel>
        </Header>

        {/* Main Content Area */}
        <DivContainer>
          {store ? (
            <>
              {store.imageUrl && (
                <img 
                  src={store.imageUrl} 
                  alt={store.name} 
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginBottom: "1rem",
                    borderRadius: "12px"
                  }} 
                  onError={(e) => (e.target.src = DEFAULT_IMAGE_URL_STORE)}

                />
              )}

              {store.name && (
                <div>
                  <h3>Όνομα</h3>
                  <p>{store.name}</p>
                </div>
              )}

              {store.description && (
                <div>
                  <h3>Περιγραφή</h3>
                  <p style={{lineHeight:"1.3em"}}>{store.description}</p>
                </div>
              )}

              {(store.address && store.city && store.region) && (
                <div>
                  <h3>Διεύθυνση</h3>
                  <p>{store.address}, {store.city}, {store.region}</p>
                </div>
              )}

              {store.openingHours && (
                <div>
                  <h3>Ώρες Λειτουργίας</h3>
                  {store.openingHours.split("\n").map((line, index) => {
                    const firstSpace = line.indexOf(" ");
                    const day = line.substring(0, firstSpace);
                    const hours = line.substring(firstSpace + 1);
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0.5rem 0"
                        }}
                      >
                        <span>{day}</span>
                        <span>{hours}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {store.phone && (
                <div>
                  <h3>Τηλέφωνο</h3>
                  <p>{store.phone}</p>
                </div>
              )}

              {store.website && (
                <div>
                  <h3>Ιστοσελίδα</h3>
                  <StyledLink
                    href={store.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {store.website}
                  </StyledLink>
                </div>
              )}

              {(store.facebook || store.instagram || store.tikTok) && (
                <div>
                  <h3>Social Media</h3>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    {store.facebook && (
                      <SocialIconLink
                        href={store.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebook size={24} />
                      </SocialIconLink>
                    )}
                    {store.instagram && (
                      <SocialIconLink
                        href={store.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram size={24} />
                      </SocialIconLink>
                    )}
                    {store.tikTok && (
                      <SocialIconLink
                        href={store.tikTok}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SiTiktok size={24} />
                      </SocialIconLink>
                    )}
                  </div>
                </div>
              )}

              {(store.address && store.city && store.region) && (
                <div>
                  <h3>Τοποθεσία</h3>
                  <StoreMap 
                    address={store.address} 
                    city={store.city} 
                    region={store.region} 
                  />
                </div>
              )}
            </>
          ) : (
            <p>No store information available</p>
          )}
        </DivContainer>
      </MenuCanva>

      {/* Overlay to close the off-canvas menu */}
      <CustomOverlay $isActive={props.isOpen} />
    </StyledOffCanvas>
  );
}
