import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
    Navbar, 
    NavbarBrand, 
    NavbarToggler,
    Collapse, 
    Nav, 
    NavItem, 
    NavLink,
} from 'reactstrap';
import useToggle from '@/hooks/toggle';

import UserWidget from '@/components/profile/userWidget';
import { useAuth } from '@/contexts/authContext';

export default function Navigation() {

    const { isAdmin, logout, currentUser } = useAuth();
    const [isOpen, toggleIsOpen] = useToggle();
    const router = useRouter();

    async function handleLogout () {
        try {
            await logout();
        } catch {
        } finally {
            router.push('/auth/login');
        }
    }

    return (
        <div>
            <Navbar
                color="dark"
                dark
                expand="md"
            >
                <NavbarToggler onClick={toggleIsOpen}></NavbarToggler>
                <NavbarBrand href="/blog/categories" tag={Link}>
                    Blog Town
                </NavbarBrand>
                <Collapse navbar isOpen={isOpen}>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                        {isAdmin &&
                            <NavItem>
                                <NavLink tag={Link} href="/dashboard">Dashboard</NavLink>
                            </NavItem>
                        }
                        <NavItem>
                            <NavLink tag={Link} href="/blog/categories">Blogs</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} href="/about">About</NavLink>
                        </NavItem>
                    </Nav>

                {currentUser &&
                    <NavbarBrand tag="div">
                        <UserWidget user={currentUser} handleLogout={handleLogout} />
                    </NavbarBrand>
                }
                </Collapse>

            </Navbar>

        </div>
    )
}