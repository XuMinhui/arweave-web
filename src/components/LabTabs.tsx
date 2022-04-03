import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Arweave } from './Arweave';
import { useState } from 'react';

export default function LabTabs() {
    const [value, setValue] = useState('2');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Introduction" value="1" />
                        <Tab label="Areave" value="2" />
                        <Tab label="Ipfs" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <h1>Introduction</h1>
                    <p>---------</p>
                </TabPanel>
                <TabPanel value="2">
                    <Arweave />
                </TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </Box>
    );
}
