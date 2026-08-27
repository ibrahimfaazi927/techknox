import { getCompanyProfile } from '@/lib/data';
import SettingsForm from './SettingsForm';

export const metadata = {
  title: 'Settings — Admin · TechKnox'
};

export default async function AdminCompanyProfilePage() {
  const profile = await getCompanyProfile();

  return (
    <div className="max-w-5xl">
      <SettingsForm initialProfile={profile} />
    </div>
  );
}
