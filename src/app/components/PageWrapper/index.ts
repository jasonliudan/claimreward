import styled from 'styled-components/macro';

export const PageWrapper = styled.div`
  width: calc(100% - 8rem);
  max-width: 1500px;
  margin: 1.5rem auto;
  padding: 1.5rem 4rem;
  box-sizing: content-box;

  @media (max-width: 500px) {
    padding: 1.5rem 1rem;
    width: calc(100% - 2rem);
  }
`;
