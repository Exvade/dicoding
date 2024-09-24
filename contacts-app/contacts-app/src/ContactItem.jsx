import React from 'react';
import ContactItemBody from './ContactItemBody';
import ContacItemImage from './ContactItemImage';

function ContactItem({ imageUrl, name, tag }) {
    return (
        <div className="contact-item">
            <ContacItemImage imageUrl={imageUrl} />
            <ContactItemBody name={name} tag={tag} />
        </div>
    );
}

export default ContactItem;