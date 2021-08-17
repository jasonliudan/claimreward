import styled from 'styled-components/macro';

export const EmptyText = styled.span`
  -webkit-text-stroke: 2px rgba(255, 255, 255, 1);
  color: rgba(15, 15, 76, 0);
`;

export const FilledText = styled.span`
  color: white;
`;

export const PageTitle = styled.span`
  font-size: 50px;
  font-weight: 800;
  font-family: system-ui;

  @media (max-width: 670px) {
    font-size: 40px;
  }
`;
