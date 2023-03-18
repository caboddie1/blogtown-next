import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box sx={{ p: 1 }}>
                {children}
            </Box>
        )}
        </div>
    );
}

function a11yProps(id: string) {
    return {
        id: `simple-tab-${id}`,
        'aria-controls': `simple-tabpanel-${id}`,
    };
}

export interface Tab {
    label: string;
    name: string;
    renderContent: () => React.ReactNode;
}

interface Props {
    tabs: Tab[];
}

export default function Tabs({ tabs }: Props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const iconProps = (tab: Tab) => {
        if (!/!/.test(tab.label)) return {}

        return {
            icon: <FontAwesomeIcon 
                icon={faCircleExclamation}  
                style={{ color: 'red' }}
            />,
            iconPosition: 'end' as 'end',
            label: tab.label.replaceAll('!', '')
        }
    }

    return (
        <Box sx={{ width: '100%', padding: 0 }}>
            <div className="px-1">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <MuiTabs value={value} onChange={handleChange} aria-label="Blog View">
                        { tabs.map(tab => (
                            <Tab 
                                key={tab.name}
                                label={tab.label} 
                                {...a11yProps(tab.name)} 
                                { ...iconProps(tab) }
                            />
                        ))}
                    </MuiTabs>
                </Box>
            </div>
            {tabs.map((tab, i) => (
                <TabPanel 
                    key={`panel-${tab.name}`}
                    value={value} 
                    index={i}
                >
                    {tab.renderContent()}
                </TabPanel>
            ))}

        </Box>
    )
}
