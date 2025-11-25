import styled from 'styled-components';
// import { PaperCard } from '../../common/Surface/PaperCard';
import { PaperCard } from '../common/Surface/PaperCard';
export const StyledWeatherCard = styled(PaperCard) <{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 180px;
  cursor: pointer;
  border: 2px solid ${({ theme, $selected }) =>
        $selected ? theme.colors.ink : 'transparent'};
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-4px);
  }
`;

export const WeatherIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.ink};
`;

export const WeatherLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.sizes.small};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;
