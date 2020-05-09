import React from "react";
import { Container, Image, Menu, Checkbox } from "semantic-ui-react";
import useDarkMode from "use-dark-mode";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const Layout: React.FC<any> = props => {
    const darkMode = useDarkMode(true);
    return (
        <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
            <GlobalStyles />
            <Menu borderless inverted={darkMode.value}>
                <Container>
                    <Menu.Item header>
                        <Image
                            size="mini"
                            src="/images/logo.png"
                            style={{ marginRight: "1.5em" }}
                        />
                        Nachotime!
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Checkbox
                            toggle
                            onChange={darkMode.toggle}
                            className="theme-toggle"
                        />
                    </Menu.Item>
                </Container>
            </Menu>

            <Container style={{ padding: "1em 0" }}>{props.children}</Container>
        </ThemeProvider>
    );
};

const lightTheme = {
    body: "#FFF",
    text: "#363537",
    toggleBorder: "#FFF",
    background: "#363537"
};

const darkTheme = {
    body: "#363537",
    text: "#FAFAFA",
    toggleBorder: "#6B8096",
    background: "#999"
};

const GlobalStyles = createGlobalStyle`
    body.light-mode {
    background-color: ${({ theme }) => (theme as any).body};
    color: #333;
    transition: background-color 0.3s ease;
    &.theme-toggle {
        
    }
    }
    body.dark-mode {
    background-color: #1a1919;
    color: #999;
    &.theme-toggle {

    }
    }
`;

export default Layout;
