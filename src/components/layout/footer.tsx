import React from 'react'
import { Nav, Navbar, NavItem } from 'reactstrap'
import styled from '@emotion/styled';

import Instagram from '/images/Instagram.png';
import TikTok from '/images/TikTok.png';
import Image, { StaticImageData } from 'next/image';

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
                    <NavItem key={icon.name}>
                        <SocialImage className="d-inline-block me-3">
                            <a 
                                href={icon.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                title={`Visit blogtown on ${icon.name}`}
                            >
                                <Image src={icon.image} alt={`${icon.name} logo`} width={50} height={50} />
                            </a>
                        </SocialImage>
                    </NavItem>
                ))}
            </Nav>
        </Navbar>
    )
}

const SocialImage = styled.span`

    img {
        max-width: 40px;
    }
`