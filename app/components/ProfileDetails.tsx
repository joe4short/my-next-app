import React from 'react';
import ProfileField from './ProfileField';

interface ProfileDetailsProps {
  profile: {
    userID: string;
    firstname: string;
    middlename?: string;
    lastname: string;
    mobilenumber: string;
    email: string;
  };
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile }) => (
  <>
    <ProfileField label="User ID" value={profile.userID} />
    <ProfileField label="First Name" value={profile.firstname} />
    <ProfileField label="Middle Name" value={profile.middlename} />
    <ProfileField label="Last Name" value={profile.lastname} />
    <ProfileField label="Mobile Number" value={profile.mobilenumber} />
    <ProfileField label="Email" value={profile.email} />
  </>
);

export default ProfileDetails;
