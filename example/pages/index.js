import React from 'react';
import styles from './index.css';

export default function () {
    const models = window.g_app._models.filter(
        (model) => model.namespace !== '@@dva',
    );

    return (
        <div className={styles.normal}>
            <h1>your global models:</h1>
            <ul>
                {models.map((model) => (
                    <li key={model.namespace}>
                        {JSON.stringify(model)}
                        <br />
                    </li>
                ))}
            </ul>
        </div>
    );
}
