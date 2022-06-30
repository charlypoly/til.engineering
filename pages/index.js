import Link from 'next/link';
import meta from 'gray-matter';
import parse from 'date-fns/parse';

import { Header } from '../components/header';
import { Footer } from '../components/footer';

export default function Home({ posts }) {
  return (
    <>
      <Header />
      <div className="max-w-3xl px-8 mx-auto py-4">
        <div className="py-8 mb-8">
          <em>Today I learned</em> ("TIL") helps me better transition from years
          in tech lead positions to currently moving to an OSS engineer role
          and, I hope, will help some of you realize that we all continue
          learning along the way, at all levels.
        </div>
        <ul className="space-y-3">
          {posts.map((p) => (
            <li key={p.slug} className="flex items-center space-x-3">
              <span className="block text-gray-500 w-[9.5rem] text-right">
                {p.dateStr}
              </span>
              <Link href={`/blog/${p.slug}`}>
                <a className="block font-bold">{p.title}</a>
              </Link>
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const glob = require('glob');
  const fs = require('fs');
  const path = require('path');

  return new Promise((resolve, reject) => {
    glob(
      path.join(process.cwd(), 'pages', 'blog', '*.mdx'),
      function (err, files) {
        if (err) {
          reject(err);
        } else {
          console.log('files', files);
          resolve({
            props: {
              posts: files
                .map((f) => {
                  const raw = fs.readFileSync(f);
                  console.log('raw', raw.toString());
                  const content = meta(raw);
                  if (content.data.title && content.data.date) {
                    return {
                      title: content.data.title,
                      slug: content.data.slug,
                      dateStr: content.data.date,
                      date:
                        parse(
                          content.data.date,
                          'dd/MM/yyyy',
                          new Date()
                        ).getTime() / 1000,
                    };
                  } else {
                    return null;
                  }
                })
                .filter(Boolean)
                .sort((a, b) => b.date - a.date),
            },
          });
        }
      }
    );
  });
}
