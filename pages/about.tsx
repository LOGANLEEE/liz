const About = () => {
	<div>about</div>;
};

export default About;

export async function getStaticProps(context: any) {
	return {
		props: {}, // will be passed to the page component as props
	};
}