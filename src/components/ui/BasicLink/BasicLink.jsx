import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './BasicLink.module.css';

function BasicLink({ href, text }) {
    if (href)
    {
        return (
           <Link to={href} className={cn('text', 'text_type_main-default', 'ml-2', 'mr-2', styles.link)}>
               <p>{text}</p>
           </Link>
        );
    }

    return (
        <p className={cn('text', 'text_type_main-default', 'ml-2', 'mr-2')}>{text}</p>
    );
};

BasicLink.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
};

export default BasicLink;