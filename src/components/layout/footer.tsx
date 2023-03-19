import React from 'react'
import { Nav, Navbar, NavItem } from 'reactstrap'
import styled from '@emotion/styled';

import Instagram from '/images/Instagram.png';
import TikTok from '/images/TikTok.png';
import Image, { StaticImageData } from 'next/image';
import ResponsiveImage from '../responsiveImage/responsiveImage';

interface SocialIcons {
    name: string;
    url: string;
    image: string;
}

const socialIcons: SocialIcons[] = [
    { name: 'TikTok', url: 'https://www.tiktok.com/@the_blog_town', image: '/images/TikTok.png' },
    { name: 'instagram', url: 'https://www.instagram.com/the_blog_town/', image: '/images/Instagram.png' },
]

export default function Footer() {
    return (
        <Navbar
            color='light'
            className='p-3'
        >
            <Nav>
                {socialIcons.map(icon => (
                    <StyledNavItem key={icon.name} className="me-3">
                        <a 
                            href={icon.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            title={`Visit blogtown on ${icon.name}`}
                        >
                            <ResponsiveImage src={icon.image} alt={`${icon.name} logo`} maxHeight={50} />
                        </a>
                    </StyledNavItem>
                ))}
            </Nav>
        </Navbar>
    )
}

const StyledNavItem = styled(NavItem)(() => ({
    height: 50,
    width: 50
}))