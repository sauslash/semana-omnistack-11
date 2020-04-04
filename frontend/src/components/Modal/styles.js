import styled from 'styled-components';

export const ModalStyle = styled.div`
  position: 'absolute';
  text-align: center;
  width: 50vh;
  margin-top: 40vh;
  margin-left: 50vh;
  /* transform: translate(-50px, -50px); */

  background-color: #fff;
  border-radius: 8px;
  border: '1px solid #000';
  color: #000;
  box-shadow: 2px 3px 4px 3px ${({ theme }) => theme.text};

  h2 {
    padding-top: 10px;
  }

  p {
    margin: 20px 0 20px 10px;
  }

  button {
    max-width: 200px;
    margin-bottom: 5px;
  }
`;
