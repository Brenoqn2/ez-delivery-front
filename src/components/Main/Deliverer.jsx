import styled from "styled-components";

export default function Deliverer(props) {
  const { deliverer } = props;

  return (
    <StyledDeliverer>
      <h1>{deliverer.name}</h1>
      <p>{deliverer.phone}</p>
    </StyledDeliverer>
  );
}

const StyledDeliverer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  background-color: white;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  h1 {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin: 10px 0px 0px 10px;
  }
  p {
    font-size: 14px;
    font-weight: normal;
    color: #333;
    margin: 5px 0px 10px 10px;
  }
`;
