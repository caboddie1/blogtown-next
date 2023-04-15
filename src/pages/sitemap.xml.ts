import { getBlogsPublished } from "@/api/blogs";
import { getCategories } from "@/api/categories";

const CATEGORIES_URL = 'https://blogtown.co.uk/blog/categories';
const POSTS_URL = 'https://blogtown.co.uk/blog/view';

function generateSiteMap(posts: string[], categories: string[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://blogtown.co.uk</loc>
            </url>
            <url>
                <loc>https://blogtown.co.uk/about</loc>
            </url>
        ${posts
            .map((id) => {
                return `
                    <url>
                        <loc>${`${POSTS_URL}/${id}`}</loc>
                    </url>
                `;
            })
        .join('')}
        ${categories
            .map((id) => {
                return `
                    <url>
                        <loc>${`${CATEGORIES_URL}/${id}`}</loc>
                    </url>
                `;
            })
        .join('')}
    </urlset>
    `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: any) {

	const blogs = (await getBlogsPublished({ published: true, category: 'all' }))?.data.map(r => r.url)
	const categories = ['all', ...(await getCategories())?.data.map(r => r.name)]

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(blogs, categories);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

  return {
    props: {},
  };
}

export default SiteMap;