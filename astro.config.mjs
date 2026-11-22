import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
	site: 'https://miluph.github.io',
	base: 'miluph-website',
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeKatex],
		}),
	},
	integrations: [
		starlight({
			title: 'miluph',
			customCss: ['katex/dist/katex.min.css'],
			logo: {
				light: './src/assets/miluph.svg',
				dark: './src/assets/miluph_dark.svg',
				replacesTitle: true,
			},
			tableOfContents: false,
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/christophmschaefer/miluphcuda' },
			],
			components:{
				Footer: './src/components/Footer.astro'
			},
					sidebar: [
				{
					label:'What ist miluph',
					items: [
						{label:'Overview', slug:'what-is-miluph'},	
						{ label: 'SPH Basics', slug: 'what-is-miluph/sph-basics' },
						{label: 'MPM Basics', slug: 'what-is-miluph/mpm-basics'},
						{label: 'Our Research', slug: 'what-is-miluph/our-research' }
					],
				},
				{
	label: 'miluphCUDA',
	items: [
						{label:'Overview', slug:'miluphcuda'},	
						{ label: 'Current Features', slug: 'miluphcuda/features' },
						{label: 'Simulation Examples', slug: 'miluphcuda/examples' }
					],
},
{
	label: 'milupHPC',
	items: [
		{label:'Overview', slug:'miluphpc'},
		{label:'How it Works', slug:'miluphpc/how-it-works'}
        	],
},
{
	label: 'miluph-Studio',
	items:[
		{label: 'Overview', slug:'miluph-studio'},
		{label: 'Installation', slug:'miluph-studio/installation'},
		{label: 'Quickguide', slug: 'miluph-studio/quickguide'}
	],
},
{
	label: 'SmashMPM',
	items:[
		{label: 'Overview', slug:'smashmpm'},
	]
}
			],
		}),
	],
	vite: {
		server: {
			watch: {
				usePolling: true,
			},
		},
	},
});
