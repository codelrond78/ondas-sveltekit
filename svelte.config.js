import adapter from '@sveltejs/adapter-auto';
//import adapter from '@sveltejs/adapter-static'
import sveltePreprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svelte.md'],
	kit: {
		adapter: adapter()
	},
	preprocess: [
		mdsvex({
      extensions: ['.md'],
			layout: {
        blog: 'src/routes/blog/_post.svelte'
      }
    }),
    sveltePreprocess(),
  ],
};

export default config;
