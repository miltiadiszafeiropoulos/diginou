import styled from "styled-components";

export const Div = styled.div`
  position: relative;
  min-height: 100vh;
  background: url('/DIGINOU_MOCKUP.png') no-repeat center center;
  background-size: cover;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
`;

export const Message = styled.div`
  margin: 20px 0;
  h1 {
    font-size: 2em;
    margin: 0;
  }
  p {
    margin: 10px 0 0;
    font-size: 1.1em;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: rgb(205,222,0);
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 20px;
  margin: 20px 0;
  border-radius: 4px;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background-color: #101820; 
        transform: scale(0.95); 
  }
`;

export const Divider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 30px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid rgb(205,222,0);
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }

  span {
    color: rgb(205,222,0);
    font-weight: bold;
    font-size: 1.2em;
  }
`;

export const SocialMedia = styled.div`
  margin-top: 20px;
  h2 {
    margin-bottom: 20px;
    font-size: 1.5em;
    color: rgb(205,222,0);
  }
  div {
    display: flex;
    justify-content: center;
    gap: 15px;
  }
`;

export const SocialIcon = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%; /* Makes the icon circular */
  border: 2px solid rgb(205,222,0);
  color: rgb(205,222,0);
  font-size: 1.5em;
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    background: rgb(205,222,0);
    color: #fff;
  }
`;
