import inquirer from 'inquirer';
import fakeUa from 'fake-useragent';
import axios from 'axios';
import open from 'open';
import slufigy from '@sindresorhus/slugify';
import path from 'path';
import mkdirp from 'mkdirp';
import jsToYaml from 'json-to-pretty-yaml';
import prettier from 'prettier';
import fs from 'fs';
import tinify from 'tinify';
import ora from 'ora';
import util from 'util';
import config from './config';

tinify.key = config.TINY_PNG_API_KEY;

const padLeft0 = (n: number) => n.toString().padStart(2, '0');

const formatDate = (d: Date) =>
  `${d.getFullYear()}-${padLeft0(d.getMonth() + 1)}-${padLeft0(d.getDate())}`;

const fromRoot = (...paths: string[]) =>
  path.join(__dirname, '..', '..', ...paths);

interface Answers {
  title: string;
  description: string;
  draft: boolean;
  category: string;
  tags: string;
}

async function generateBlogPost() {
  const { title, description, draft, category, tags } = await inquirer.prompt<
    Answers
  >([
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

  const yamlTags = tags.replace(' ', '').split(',');
  console.log({ yamlTags });

  const slug = slufigy(title);
  const destination = fromRoot('content/posts', slug);
  mkdirp.sync(destination);

  const socialImageCredit = await getBannerPhoto(title, destination);

  const yaml = jsToYaml.stringify({
    title,
    slug,
    draft,
    date: formatDate(new Date()),
    description,
    category,
    tags,
    socialImage: './images/banner.jpg',
    socialImageCredit,
  });

  const markdown = prettier.format(`---\n${yaml}\n---\n`, {
    parser: 'markdown',
  });

  fs.writeFileSync(path.join(destination, 'index.md'), markdown);

  console.log(`${destination.replace(process.cwd(), '')} is all ready for you`);
}

async function getBannerPhoto(title: string, destination: string) {
  const imagesDestination = path.join(destination, 'images');

  await open(
    `https://unsplash.com/search/photos/${encodeURIComponent(title)}`,
    {
      wait: false,
    }
  );

  const { unsplashPhotoId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'unsplashPhotoId',
      message: 'What is the Unsplash Photo ID for the banner for this post?',
    },
  ]);

  mkdirp.sync(imagesDestination);

  const source = tinify
    .fromUrl(
      `https://unsplash.com/photos/${unsplashPhotoId}/download?force=true`
    )
    .resize({
      method: 'scale',
      width: 2070,
    });

  const spinner = ora('compressing the image with tinypng.com').start();

  await util
    .promisify(source.toFile)
    .call(source, path.join(imagesDestination, 'banner.jpg'));

  spinner.text = 'compressed the image with tinypng.com';
  spinner.stop();

  const socialImageCredit = await getPhotoCredit(unsplashPhotoId);
  return socialImageCredit;
}

async function getPhotoCredit(unsplashPhotoId: string) {
  const response = await axios({
    url: `https://unsplash.com/photos/${unsplashPhotoId}`,
    headers: { 'User-Agent': fakeUa() },
  });

  const {
    groups: { name },
  } = response.data.match(/Photo by (?<name>.*?) on Unsplash/) || {
    groups: { name: 'Unknown' },
  };

  return `Foto por [${name}](https://unsplash.com/photos/${unsplashPhotoId})`;
}

generateBlogPost();
