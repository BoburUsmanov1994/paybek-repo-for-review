import React, {useState} from 'react';
import {ThemeProvider} from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Wrapper from "../components/wrapper";

const Theme = ({children}) => {

    const [mode, setMode] = useState('light');

    const changeMode = (value) => {
        setMode(value);
    }

    return (
        <ThemeProvider theme={{mode}}>
            <Wrapper>
                <GlobalStyles/>
                {children}
            </Wrapper>
        </ThemeProvider>
    );
};

export default Theme;
