import {defineCollection} from 'astro:content';
import {z} from 'astro/zod';
import {glob} from 'astro/loaders';
const articles=defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/articles'}),schema:z.object({title:z.string(),description:z.string(),category:z.enum(['guides','blog','glossary']),section:z.enum(['selection','budget','subscription','devices','troubleshooting','network','scenarios','privacy']).optional(),published:z.coerce.date(),updated:z.coerce.date(),tags:z.array(z.string()),sources:z.array(z.url()),draft:z.boolean().default(false)})});
export const collections={articles};
