import styled from 'styled-components'

export const CardImage = styled.img`
    filter: grayscale(${({ $isOwned }) => $isOwned ? '100%' : '0'});
    height: 200px;
    width: 160px;
`