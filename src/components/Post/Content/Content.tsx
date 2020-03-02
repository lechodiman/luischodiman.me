import React from 'react';
import Image from 'gatsby-image';
import styles from './Content.module.scss';
import { FluidObject } from 'gatsby-image';
import Markdown from 'react-markdown';

interface Props {
  body: string;
  title: string;
  socialImage: FluidObject;
  socialImageCredit?: string;
}

const Content: React.FC<Props> = ({
  body,
  title,
  socialImage,
  socialImageCredit,
}) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']}>{title}</h1>

    <div className={styles['content__social_image']}>
      <Image fluid={socialImage} alt={title}></Image>
      {socialImageCredit && <Markdown>{socialImageCredit}</Markdown>}
    </div>

    <div
      className={styles['content__body']}
      dangerouslySetInnerHTML={{ __html: body }}
    />
  </div>
);

export default Content;
