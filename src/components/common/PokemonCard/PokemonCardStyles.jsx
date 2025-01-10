import styled from 'styled-components'

export const CardImage = styled.img`
    filter: grayscale(${({ $isOwned }) => $isOwned ? '0' : '100%'});
    height: 200px;
    width: 160px;
`