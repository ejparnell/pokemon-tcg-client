import styled from 'styled-components'

export const DrawerContainer = styled.div`
    position: fixed;
    top: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
    left: 0;
    width: 100%;
    height: 100%;
    background: #f8f9fa;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    transition: top 0.3s ease-in-out;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    padding: 16px;
    overflow-y: ${({ $isOpen }) => ($isOpen ? 'auto' : 'hidden')};
`

export const Overlay = styled.div`
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`
