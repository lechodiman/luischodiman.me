import React from 'react';
import moment from 'moment';
import styles from './Meta.module.scss';

interface Props {
  date: string;
}

const Meta: React.FC<Props> = ({ date }) => (
  <div className={styles['meta']}>
    <p className={styles['meta__date']}>
      Publicado el {moment(date).format('D MMM YYYY')}
    </p>
  </div>
);

export default Meta;
