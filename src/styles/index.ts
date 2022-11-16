import styled from "styled-components";

// Global container style which is used in Navbar and for pages
export const Container = styled.div`
	max-width: 1200px;
	width: 100%;
	margin-left: auto;
	margin-right: auto;
`;

export const PageContainer = styled(Container)`
	margin-top: ${({ theme: { space } }) => space[5]};
`;
