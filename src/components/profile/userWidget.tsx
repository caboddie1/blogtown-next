import React, { useState } from 'react';
import { User } from '@firebase/auth';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import Link from 'next/link';

import { useAuth } from '../../contexts/authContext';
interface Props {
    user: User;
    handleLogout: React.MouseEventHandler<HTMLButtonElement>;
}

export default function UserWidget({ user, handleLogout }: Props) {
    const { isAdmin } = useAuth();
    const initial = user.email ? user.email[0].toUpperCase() : 'A';
    const [toggle, setToggle] = useState<boolean>(false);

    const handleToggle=() => {
        setToggle(toggle => !toggle);
    }

    return (
        <Dropdown toggle={handleToggle} isOpen={toggle}>
            <DropdownToggle tag="div">
                <div className="user-profile">
                    <h1 className="text-center user-initial">{initial}</h1>
                </div>
            </DropdownToggle>
            <DropdownMenu >
                <DropdownItem header>
                    {user.email}
                    {isAdmin && ' (Admin)'}
                </DropdownItem>
                {user.displayName &&
                    <DropdownItem>
                        {user.displayName}
                    </DropdownItem>
                }
                <DropdownItem divider />
                <DropdownItem>
                    <Link href="/update-profile">
                        Update Profile
                    </Link>
                </DropdownItem>
                {isAdmin &&
                    <DropdownItem>
                        <Link href="create-blog">
                            Create Blog
                        </Link>
                    </DropdownItem>
                }
                <DropdownItem divider />
                <div style={{ padding: '.25rem 1rem' }}>
                    <Button color="secondary" outline onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </DropdownMenu>
        </Dropdown>
    )
}

