const Template = () => {
	<div>about</div>;
};

export default Template;

export async function getStaticProps(context: any) {
	return {
		props: {}, // will be passed to the page component as props
	};
}
