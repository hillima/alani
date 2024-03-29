import styled, { keyframes } from 'styled-components';

const placeHolderShimmer = keyframes`
  0% {
    background-position: -500px 0
  }
  100% {
    background-position: 500px 0
  }
`;

const loadingAsset = keyframes`
  0% {
    background-color: #ffffff;
  }
  50% {
    background-color: #eaeaea;
  }
  100% {
    background-color: #ffffff;
  }
`;

type CardProps = {
  hasMultiple: boolean;
};

export const Card = styled.article<CardProps>`
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 253px;
  max-width: 253px;
  outline: none;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.altbgColor};
  position: relative;
  transition: 0.3s;
  cursor: pointer;
  video {
    width: 253px;
    max-height: 240px;
    border-radius: 0;
    object-fit: cover;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
  }
  :hover {
    transform: scale(1.02);
  }
  :focus-visible {
    transform: scale(1.02);
  }
  ${({ hasMultiple }) =>
    hasMultiple &&
    `
    :before {
      display: block;
      content: '';
      height: 100%;
      width: 97.5%;
      position: absolute;
      top: 5px;
      left: 0.75%;
      border-bottom: solid 1px #e6e6e6;
      border-radius: 16px;
    }
    :after {
      display: block;
      content: '';
      height: 100%;
      width: 95%;
      position: absolute;
      top: 10px;
      left: 2%;
      border-bottom: solid 1px #e6e6e6;
      border-radius: 16px;
    }
  `}
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 21px;
  line-height: 32px;
  color: #FFFFFF;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const Text = styled.span`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: ${props => props.theme.colors.titleColor};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin-top: 20px;
`;

export const CollectionNameButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  outline: none;
  border: none;
  z-index: 1;
  cursor: pointer;
`;

export const GreyText = styled(Text)`
  color: #808080;
  margin-bottom: 8px;
`;

export const Tag = styled.div`
  font-family: CircularStdBold;
  font-size: 10px;
  line-height: 16px;
  letter-spacing: 1px;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 8px 16px;
  margin-bottom: 10px;
  opacity: 0.9;
  border-radius: 4px;
  background-color: #7B0A75;
  color: #fff;
`;

export const PlaceholderPrice = styled.div`
  height: 8px;
`;

export const ShimmerBlock = styled(PlaceholderPrice)`
  animation: ${placeHolderShimmer} 1s linear infinite;
  background: linear-gradient(to right, #eeeeee 8%, #e7e7e7 18%, #eeeeee 33%);
  background-size: 1000px 18px;
  width: 200px;
  height: 14px;
`;

export const PlaceholderAsset = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  animation: ${loadingAsset} 1s infinite;
`;

export const GreyBy = styled.span`
  color: #A6A9B9;
`;

export const Author = styled.h4`
    font-family: 'Futura';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 21px;
    text-align: center;
    color: ${props => props.theme.colors.titleColor};
    margin-top: 5px;
`;

export const Price = styled.div`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #7B0A75;
  text-align: center;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;