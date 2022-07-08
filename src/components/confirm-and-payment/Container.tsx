import styled from 'styled-components';

export default styled.div`
  border: 1px solid hsla(0, 0%, 85.1%, 0.5);
  border-radius: 16px;
  width: 100%;
  padding: 20px;
  margin: 0 auto;

  ${({ theme }) => theme.gui.media.mobile} {
    border: none;
    padding: 0 6px;
  }
`;
