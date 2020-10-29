import React from 'react';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import Avatar from '../components/avatar';

export default {
  title: 'Avatar',
  decorators: [withKnobs],
};

export const withGradientSeed: React.FC = () => (
  <div>
    <div style={{ width: '45px' }}>
      <Avatar
        text="KT"
        gradientSeed={text('Gradient Seed (KT)', '1234-1234-1234-1234')}
      />
    </div>
    <br />
    <div style={{ width: '32px' }}>
      <Avatar
        text="CC"
        gradientSeed={text('Gradient Seed (CC)', '5678-5678-5678-5678')}
      />
    </div>
  </div>
);

export const withIcon: React.FC = () => {
  const plane = {
    iconKey: 'paper-plane',
    color: color('Background Plane', '#5644D8'),
  };

  const clock = {
    iconKey: 'clock',
    color: color('Background Clock', '#7BC4A9'),
  };

  const salesforce = {
    isIconBrand: true,
    iconKey: 'salesforce',
    color: color('Background Salesforce', '#18a8d8'),
  };

  const magento = {
    isIconBrand: true,
    iconKey: 'magento',
    color: color('Background Magento', '#c14800'),
  };

  return (
    <div>
      <div style={{ width: '45px' }}>
        <Avatar {...plane} />
      </div>
      <br />
      <div style={{ width: '45px' }}>
        <Avatar {...clock} />
      </div>
      <br />
      <div style={{ width: '45px' }}>
        <Avatar {...salesforce} />
      </div>
      <br />
      <div style={{ width: '45px' }}>
        <Avatar {...magento} />
      </div>
      <br />
      <div style={{ width: '32px' }}>
        <Avatar isSmallIcon {...plane} />
      </div>
      <br />
      <div style={{ width: '32px' }}>
        <Avatar isSmallIcon {...clock} />
      </div>
      <br />
      <div style={{ width: '32px' }}>
        <Avatar isSmallIcon {...salesforce} />
      </div>
      <br />
      <div style={{ width: '32px' }}>
        <Avatar isSmallIcon {...magento} />
      </div>
    </div>
  );
};

export const withImage: React.FC = () => (
  <div>
    <div style={{ width: '45px' }}>
      <Avatar
        imageSrc={text(
          'Image Source (First)',
          'https://global-uploads.webflow.com/5873645dcda6383b06dc220a/5b9a825ea6ef6021d01d6774_DIXA-426-2.jpg',
        )}
      />
    </div>
    <br />
    <div style={{ width: '45px' }}>
      <Avatar
        imageSrc={text(
          'Image Source (Second)',
          'https://global-uploads.webflow.com/5873645dcda6383b06dc220a/5b645adbc899f51886b6f1dd_DSC_4137.jpg',
        )}
      />
    </div>
  </div>
);

export const withUser: React.FC = () => {
  /*
   * Knob groups
   */
  const GROUP_AVATAR = 'User with avatar';
  const GROUP_NAME = 'User with name';
  const GROUP_EMAIL = 'User with Email';
  const GROUP_PHONE_NUMBER = 'User with Phone Number';

  /*
   * Knob field names
   */
  const AVATAR_URL = 'Avatar URL';
  const NAME = 'Name';
  const EMAIL = 'Email';
  const PHONE_NUMBER = 'Phone Number';

  /*
   * Knob default values
   */
  const AVATAR_URL_VALUE =
    'https://dixa-uploads.s3-eu-west-1.amazonaws.com/e7a04fc4-bba8-48a8-a92e-013606a188a6/user_avatar/5b613833-bc48-462b-aa1b-c43b4e6dc928.png';
  const NAME_VALUE = 'John Doe';
  const EMAIL_VALUE = 'john@gmail.com';
  const PHONE_NUMBER_VALUE = '+4560860931';

  return (
    <div>
      <small>
        User with avatar, name, email and phone number - should show avatar
      </small>
      <div style={{ width: '45px' }}>
        <Avatar
          user={{
            id: '1234-1234-1234-1234',
            avatarUrl: text(AVATAR_URL, AVATAR_URL_VALUE, GROUP_AVATAR),
            name: text(NAME, NAME_VALUE, GROUP_AVATAR),
            email: text(EMAIL, EMAIL_VALUE, GROUP_AVATAR),
            phoneNumber: text(PHONE_NUMBER, PHONE_NUMBER_VALUE, GROUP_AVATAR),
          }}
        />
      </div>
      <br />
      <small>
        User with name, email and phone number - should print &quot;JD&quot;.
      </small>
      <div style={{ width: '45px' }}>
        <Avatar
          user={{
            id: '1234-1234-1234-1234',
            avatarUrl: text(AVATAR_URL, '', GROUP_NAME),
            name: text(NAME, NAME_VALUE, GROUP_NAME),
            email: text(EMAIL, EMAIL_VALUE, GROUP_NAME),
            phoneNumber: text(PHONE_NUMBER, PHONE_NUMBER_VALUE, GROUP_NAME),
          }}
        />
      </div>
      <br />
      <small>
        User with email and phone number - should print &quot;JG&quot;.
      </small>
      <div style={{ width: '45px' }}>
        <Avatar
          user={{
            id: '1234-1234-1234-1234',
            avatarUrl: text(AVATAR_URL, '', GROUP_EMAIL),
            name: text(NAME, '', GROUP_EMAIL),
            email: text(EMAIL, EMAIL_VALUE, GROUP_EMAIL),
            phoneNumber: text(PHONE_NUMBER, PHONE_NUMBER_VALUE, GROUP_EMAIL),
          }}
        />
      </div>
      <br />
      <small>User with only phone number - should print &quot;31&quot;.</small>
      <div style={{ width: '45px' }}>
        <Avatar
          user={{
            id: '1234-1234-1234-1234',
            avatarUrl: text(AVATAR_URL, '', GROUP_PHONE_NUMBER),
            name: text(NAME, '', GROUP_PHONE_NUMBER),
            email: text(EMAIL, '', GROUP_PHONE_NUMBER),
            phoneNumber: text(
              PHONE_NUMBER,
              PHONE_NUMBER_VALUE,
              GROUP_PHONE_NUMBER,
            ),
          }}
        />
      </div>
      <br />
      <h6>Anonymous - only id</h6>
      <div style={{ width: '45px' }}>
        <Avatar user={{ id: '1234-1234-1234-1234' }} />
      </div>
      <br />
      <h6>Unassigned</h6>
      <div style={{ width: '45px' }}>
        <Avatar user={null} />
      </div>
    </div>
  );
};
