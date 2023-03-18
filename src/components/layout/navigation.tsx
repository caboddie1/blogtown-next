import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
    Navbar, 
    NavbarBrand, 
    NavbarToggler,
    NavbarText,
    Collapse, 
    Nav, 
    NavItem, 
    NavLink,
    Button
} from 'reactstrap';
import useToggle from '@/hooks/toggle';

//import { useAuth } from '../../contexts/AuthContext';
import UserWidget from '@/components/profile/userWidget';
//import useToggle from '../../hooks/toggle';

export default function Navigation() {

    //const { isAdmin, logout, currentUser } = useAuth();
    const isAdmin = true;
    const logout = () => null;
    const currentUser = null;
    const [isOpen, toggleIsOpen] = useToggle();
    const router = useRouter();
    //const navigate = useNavigate();

    async function handleLogout () {
        try {
            await logout();
        } catch {
        } finally {
            router.push('/login');
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
                <NavbarBrand href="/blogs/categories" tag={Link}>
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
                            <NavLink tag={Link} href="/blogs/categories">Blogs</NavLink>
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