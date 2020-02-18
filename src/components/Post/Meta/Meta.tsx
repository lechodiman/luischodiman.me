import React from 'react';
import moment from 'moment';
import styles from './Meta.module.scss';

interface Props {
  date: string;
  editLink?: string;
}

const Meta: React.FC<Props> = ({ date, editLink }) => (
  <div className={styles.meta}>
    <p className={styles.meta__date}>
      Publicado el {moment(date).format('D MMM YYYY')}
    </p>
    <p className={styles.meta__editLink}>
      <a target="_blank" rel="noopener noreferrer" href={editLink}>
        Editar post en Github
      </a>
    </p>
  </div>
);

export default Meta;
