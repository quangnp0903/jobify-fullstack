import {
  Form,
  useOutletContext,
  type ActionFunctionArgs,
} from 'react-router-dom';
// import styled from 'styled-components';

import { FormRow } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import type { User } from '../models/User';
import { handleApiErr } from '../utils/common';
import Wrapper from '../assets/wrappers/DashboardForm';
import SubmitBtn from '../components/SubmitBtn';

type DashboardOutletContext = {
  user: User;
};

const Profile: React.FC = () => {
  const { user } = useOutletContext<DashboardOutletContext>();

  return (
    <Wrapper>
      <h4>Profile</h4>
      <Form method="post" className="form" encType="multipart/form-data">
        <div className="form-row">
          <label htmlFor="avatar" className="form-label">
            Select an image file (max 0.5 MB)
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            className="form-input"
            accept="image/*"
          />
        </div>
        <FormRow name="name" type="text" defaultValue={user.name} />
        <FormRow
          name="lastName"
          type="text"
          labelText="last name"
          defaultValue={user.lastName}
        />
        <FormRow name="email" type="text" defaultValue={user.email} />
        <FormRow
          name="location"
          type="text"
          labelText="location"
          defaultValue={user.location}
        />
        <SubmitBtn formBtn />
      </Form>
    </Wrapper>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const file = formData.get('avatar') as File;

  if (file?.size > 500000) {
    toast.error('Image size too large');
    return null;
  }

  try {
    await customFetch.patch('/users/update-user', formData);

    toast.success('Profile updated successfully');
  } catch (error) {
    handleApiErr(error);
  }

  return null;
};

export default Profile;
