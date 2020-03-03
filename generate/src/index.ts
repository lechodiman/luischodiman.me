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
import { formatDate, fromRoot } from './utils';
import { Answers } from './types';

tinify.key = config.TINY_PNG_API_KEY;

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
  const slug = slufigy(title);

  const unsplashPhotoId = await getUnsplashPhotoId(title);
  const socialImageCredit = await getPhotoCredit(unsplashPhotoId);

  const yaml: string = jsToYaml.stringify({
    title,
    slug,
    draft,
    date: formatDate(new Date()),
    description,
    category,
    tags: yamlTags,
    socialImage: './images/banner.jpg',
    socialImageCredit,
  });

  const postDestination = createPostFolder(slug);
  createPostMarkdown(yaml, postDestination);

  const imagesDestination = await createImagesFolder(postDestination);
  await downloadImage(unsplashPhotoId, imagesDestination);
}

function createPostMarkdown(yaml: string, postDestination: string) {
  const markdown = prettier.format(`---\n${yaml}\n---\n`, {
    parser: 'markdown',
  });
  fs.writeFileSync(path.join(postDestination, 'index.md'), markdown);

  console.log(
    `${postDestination.replace(process.cwd(), '')} is all ready for you`
  );
}

function createPostFolder(slug: string) {
  const postDestination = fromRoot('content/posts', slug);
  mkdirp.sync(postDestination);

  return postDestination;
}

async function createImagesFolder(postDestination: string) {
  const imagesDestination = path.join(postDestination, 'images');
  mkdirp.sync(imagesDestination);

  return imagesDestination;
}

async function getUnsplashPhotoId(title: string) {
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

  return unsplashPhotoId;
}

async function downloadImage(
  unsplashPhotoId: string,
  imagesDestination: string
) {
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
