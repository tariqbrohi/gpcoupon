import styled from 'styled-components';

export default styled.main`
  margin: 108px 0;
  height: max-content;
  width: 100%;

  ${({ theme }) => theme.gui.media.mobile} {
    margin: 50px 0;
  }
`;
