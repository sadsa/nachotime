import React from "react";
import { Container, Image, Menu } from "semantic-ui-react";
import styled from "styled-components";

const Layout: React.FC<any> = (props) => {
    return (
        <>
            <StyledMenu borderless>
                <Container>
                    <Menu.Item header>
                        <StyledLogo size="mini" src="/images/logo.png" />
                        Nachotime!
                    </Menu.Item>
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
