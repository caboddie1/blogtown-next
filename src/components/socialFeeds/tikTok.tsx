import React from 'react';
import { ParentSize } from '@visx/responsive';
import styled from '@emotion/styled';

import useScript from '@/hooks/useScript';


export default function TikTok() {

    useScript('https://www.tiktok.com/embed.js')

    return (
        <TikTokStyles>
            <ParentSize>
                {({ width }) => (
                    <>
                        <blockquote 
                            className="tiktok-embed" 
                            cite="https://www.tiktok.com/@the_blog_town" 
                            data-unique-id="the_blog_town" 
                            data-embed-type="creator" 
                            style={{
                                width,
                                maxWidth: 770
                            }}
                        > 
                            <section>
                                <a 
                                    target="_blank" 
                                    href="https://www.tiktok.com/@the_blog_town?refer=creator_embed"
                                    rel="noreferrer" 
                                >
                                    @the_blog_town
                                </a>
                            </section>
                        </blockquote>
                    </>
                )}
            </ParentSize>
        </TikTokStyles>
    )
}

const TikTokStyles = styled.div`
    div#root {
        background: #eaebf0;
    }
`