'use strict';

import React from 'react';
import classNames from 'classnames';

class Popup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false
        };

        this.show = this.show.bind(this);
        this.showConfirmation = this.showConfirmation.bind(this);
        this.hide = this.hide.bind(this);
    }

    show(state) {
        this.setState(Object.assign({}, state, { isVisible: true }));
    }
    
    showConfirmation(content) {
        const self = this;

        return new Promise((resolve, reject) => {

            self.show({
                title: 'Confirmation',
                content,
                isSmall: true,
                onClose: null,
                buttons: [{
                    className: 'btn btn-default',
                    children: 'No',
                    onClick: () => {
                        self.hide();
                        resolve(false);
                    }
                }, {
                        className: 'btn btn-primary',
                        children: 'Yes',
                        onClick: () => {
                            self.hide();
                            resolve(true);
                        }
                    }]
            });
        });
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
                        <a onClick={onClose} className="close-btn"><i className="glyphicon glyphicon-remove"></i></a>
                        : null
                    }
                    {title ?
                        <h4 className="title">{title}</h4>
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