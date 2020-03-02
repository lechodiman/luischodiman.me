import inquirer from 'inquirer';
import slufigy from '@sindresorhus/slugify';
import path from 'path';
import mkdirp from 'mkdirp';
import jsToYaml from 'json-to-pretty-yaml';
import prettier from 'prettier';
import fs from 'fs';

const padLeft0 = (n: number) => n.toString().padStart(2, '0');

const formatDate = (d: Date) =>
  `${d.getFullYear()}-${padLeft0(d.getMonth() + 1)}-${padLeft0(d.getDate())}`;

const fromRoot = (...paths: string[]) =>
  path.join(__dirname, '..', '..', ...paths);

async function generateBlogPost() {
  const { title, description, draft, category, tags } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Title',
    },
    {
      type: 'confirm',
      name: 'draft',
      message: 'Is this a draft?',
      default: false,
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description',
    },
    {
      type: 'input',
      name: 'category',
      message: 'Category',
    },
    {
      type: 'input',
      name: 'tags',
      message: 'Tags (comma separated)',
    },
  ]);

  const slug = slufigy(title);
  const destination = fromRoot('content/posts', slug);
  mkdirp.sync(destination);

  const yaml = jsToYaml.stringify({
    title,
    slug,
    draft,
    date: formatDate(new Date()),
    description,
    category,
    tags,
    socialImage: './images/banner.jpg',
  });

  const markdown = prettier.format(`---\n${yaml}\n---\n`, {
    parser: 'markdown',
  });

  fs.writeFileSync(path.join(destination, 'index.md'), markdown);

  console.log(`${destination.replace(process.cwd(), '')} is all ready for you`);
}

generateBlogPost();
