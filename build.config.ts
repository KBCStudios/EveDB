import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: ['src/index.ts', 'src/Builders/index.ts'],
	declaration: false,
	rollup: {
		emitCJS: true,
	},
	failOnWarn: false,
	outDir: './scripts',
});
