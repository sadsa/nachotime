import React from "react";
import { Container, Image, Menu, Checkbox } from "semantic-ui-react";
import useDarkMode from "use-dark-mode";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

const Layout: React.FC<any> = (props) => {
    const darkMode = useDarkMode(true);
    return (
        <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
            <GlobalStyles />
            <StyledMenu borderless inverted={darkMode.value}>
                <Container>
                    <Menu.Item header>
                        <StyledLogo size="mini" src="/images/logo.png" />
                        Nachotime!
                    </Menu.Item>
                    <Menu.Item position="right">
                        <StyledThemeToggle
                            toggle
                            onChange={darkMode.toggle}
                            className="theme-toggle"
                        />
                    </Menu.Item>
                </Container>
            </StyledMenu>

            <StyledContainer>{props.children}</StyledContainer>
        </ThemeProvider>
    );
};

const lightTheme = {
    body: "#FFF",
    text: "#363537",
    toggleBorder: "#FFF",
    background: "#ffffff",
};

const darkTheme = {
    body: "#363537",
    text: "#FAFAFA",
    toggleBorder: "#6B8096",
    background: "#1b1c1d",
};

const GlobalStyles = createGlobalStyle<any>`
    body.light-mode {
        background-color: ${({ theme }) => theme.background};
        color: #333;
        transition: background-color 1s ease;
    }
    body.dark-mode {
        background-color: ${({ theme }) => theme.background};
        color: #999;
    }
`;

const StyledLogo = styled(Image)`
    margin-right: 1.5em;
`;

const StyledThemeToggle = styled(Checkbox)`
    display: inherit;
`;

const StyledMenu = styled(Menu)`
    &.ui.menu {
        background: transparent;
    }
`;

const StyledContainer = styled(Container)`
    padding: 1em 0;
`;

export default Layout;
