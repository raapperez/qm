'use strict';

import React from 'react';
import classNames from 'classnames';

class Popup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false

        };
    }

    show(state) {
        this.setState(Object.assign({}, state, { isVisible: true }));
    }
    
    showConfirmation(content) {
        const self = this;

        return new Promise((resolve, reject) => {

            self.show({
                title: ('form.confirmation'),
                content,
                isSmall: true,
                onClose: () => {
                    self.hide();
                    resolve(false);
                },
                buttons: [{
                    className: 'negative-btn',
                    children: ('form.buttons.no'),
                    onClick: () => {
                        self.hide();
                        resolve(false);
                    }
                }, {
                        className: 'positive-btn',
                        children: ('form.buttons.yes'),
                        onClick: () => {
                            self.hide();
                            resolve(true);
                        }
                    }]
            });
        });
    }

    showDeleteConfirmation() {
        return this.showConfirmation(('popup.confirmDelete'));
    }
    
    showDisableConfirmation() {
        return this.showConfirmation(('popup.confirmDisable'));
    }
    
    showRemoveConfirmation() {
        return this.showConfirmation(('popup.confirmRemove'));
    }
    
    showArchiveConfirmation() {
        return this.showConfirmation(('popup.confirmArchive'));
    }

    hide() {
        this.setState({ isVisible: false });
    }

    render() {
        const {onClose, isVisible, title, content, buttons = [], isSmall} = this.state;

        return (
            <div className={classNames('popup-component', { 'hide': !isVisible }) }>
                <div className={classNames('panel', { 'small': isSmall }) }>
                    {onClose ?
                        <a className="fleet-icon-bt_close close-btn" onClick={onClose}></a>
                        : null
                    }
                    {title ?
                        <span className="title">{title}</span>
                        : null
                    }

                    <div className="content">
                        {content}
                    </div>

                    <div className="footer">
                        {
                            buttons.map(({ children, ...rest}) => (
                                 <a key={Math.random() } {...rest}>{children}</a>
                            ))
                        }
                    </div>

                </div>
            </div>
        );
    }
}

export default Popup;