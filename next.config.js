/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	compress: true,
	compiler: {
		styledComponents: true,
	},
	output: 'standalone',
};

module.exports = nextConfig;
