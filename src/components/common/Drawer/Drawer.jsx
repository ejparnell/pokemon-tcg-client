import { useState } from 'react'

import { DrawerContainer, Overlay } from './DrawerStyles'
import Button from '../Button/Button'

export default function Drawer({ children }) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDrawer = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <>
            <Overlay $isOpen={isOpen} onClick={toggleDrawer} />

            <DrawerContainer $isOpen={isOpen}>
                <Button onClick={toggleDrawer}>Close Drawer</Button>
                {children}
            </DrawerContainer>

            {!isOpen && (
                <Button onClick={toggleDrawer}>
                    Open Drawer
                </Button>
            )}
        </>
    )
}
