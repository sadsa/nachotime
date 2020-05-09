import React from "react";
import { Container, Image, Menu, Checkbox, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { useRouter } from "next/router";

const Layout: React.FC<any> = (props) => {
    const { query } = useRouter();
    const darkMode = query.darkMode && JSON.parse(query.darkMode as string);
    return (
        <>
            <StyledMenu borderless>
                <Container>
                    <Menu.Item header>
                        <StyledLogo size="mini" src="/images/logo.png" />
                        Nachotime!
                    </Menu.Item>
                    {darkMode ? (
                        <Menu.Item position="right" href="/">
                            <Icon name="sun outline" />
                            Light Mode
                        </Menu.Item>
                    ) : (
                        <Menu.Item position="right" href="/?darkMode=true">
                            <Icon name="moon" />
                            Dark Mode
                        </Menu.Item>
                    )}
                </Container>
            </StyledMenu>

            <StyledContainer>{props.children}</StyledContainer>
        </>
    );
};

const StyledLogo = styled(Image)`
    margin-right: 1.5em;
`;

const StyledMenu = styled(Menu)`
    &.ui.menu {
        background: transparent;
    }
`;

const StyledContainer = styled(Container)`
    padding: 1rem 0 4rem 0;
`;

export default Layout;
