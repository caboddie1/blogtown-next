import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from '@emotion/styled';

import ConditionalWrapper from '../conditionalWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export interface IMenuItem {
    label: string;
    onClick?: () => void;
    wrapper?: (children: JSX.Element) => JSX.Element;
}

interface Props {
    buttonLabel: string;
    items: IMenuItem[];
}

export default function DropdownMenu({ items, buttonLabel }: Props) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleItemClick = ({ onClick }: IMenuItem) => {
        if (onClick) onClick();
        handleClose();
    }

    return (
        <div>
        <StyledButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            aria-label="Change category menu"
            onClick={handleClick}
        >
            <span className="me-2">{buttonLabel}</span>
            <FontAwesomeIcon icon={faChevronDown} />
        </StyledButton>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            {items.map(item => (
                <ConditionalWrapper
                    condition={!!item.wrapper}
                    wrapper={(children) => item?.wrapper ? item.wrapper(children) : <>{children}</>}
                    key={item.label}
                >
                    <MenuItem 
                        onClick={() => handleItemClick(item) }
                    >
                        {item.label}
                    </MenuItem>
                </ConditionalWrapper>
            ))}
        </Menu>
        </div>
    )
}

const StyledButton = styled(Button)(() => ({
    background: '#00000014',
    borderRadius: 16,
    fontWeight: 600,
    textTransform: 'initial',
    color: '#000',
    span: {
        fontSize: '1em'
    }
}))