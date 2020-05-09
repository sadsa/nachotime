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
    background: "#363537",
};

const darkTheme = {
    body: "#363537",
    text: "#FAFAFA",
    toggleBorder: "#6B8096",
    background: "#999",
};

const GlobalStyles = createGlobalStyle`
    .light-mode {
        background-color: ${({ theme }) => (theme as any).body};
        color: #333;
        transition: background-color 0.3s ease;
    }
    .dark-mode {
        background-color: #1a1919;
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
    transition: background 0.3s ease;
    &.inverted {
        transition: background 0.3s ease;
    }
`;

const StyledContainer = styled(Container)`
    padding: 1em 0;
`;

export default Layout;
