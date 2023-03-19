import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { ParentSize } from '@visx/responsive';

interface Props {
    className?: string;
    src: string;
    alt: string;
    maxHeight?: number | null;
    center?: boolean;
}

export default function ResponsiveImage({ maxHeight = null, center = false, ...imageProps }: Props) {
    
    const [ratio, setRatio] = useState(16/9) // default to 16:9

    // Calculate the image width and height
    function getImageDimensions(width: number): { width: number; height: number } {

        // Divide width by ratio to get the height
        const height = width / ratio;

        if (height <= 0 || width <= 0) return { width: 0, height: 0 }

        // When maxHeight is null or height is less than the max height return width and height
        if (!maxHeight || height <= maxHeight) return { width, height }

        // Otherwise keep calling the function until the height is less than the maximum
        return getImageDimensions(width - 10)
    }

    return (
        <ParentSize>
            {({ width }) => (
                <Image
                    {...{
                        ...imageProps,
                        ...getImageDimensions(width),
                        onLoadingComplete: ({ naturalWidth, naturalHeight }) => {
                            const ratio = naturalWidth / naturalHeight;
                            if (!isNaN(ratio)) setRatio(naturalWidth / naturalHeight);
                        }
                    }}
                />
            )}
        </ParentSize>
    )
}

interface ImageWrapperProps {
    height: number;
    center: boolean;
    children: React.ReactNode;
}

const ImageWrapper = styled(({ height, children, ...props }: ImageWrapperProps) => (
    <div { ...props }>
        {children}
    </div>
))<ImageWrapperProps>(({ height, center }) => ({
    height,
    position: 'relative',
    ['& img']: {
        width: 'auto !important',
        ...(!center) ? {} : {
            margin: '0 auto'
        }
    }
}))

const ImageWrapper2 = styled.div`
  width: 100%;

    position: unset !important;

  .image {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
`