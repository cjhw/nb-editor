import { DEFAULT_PRIVATE_ROUTE } from '@/constants/route';
import { checkIsLogin } from '@/libs/auth';
import { redirect } from 'next/navigation';

export default async function Default() {
  if (await checkIsLogin()) {
    redirect(DEFAULT_PRIVATE_ROUTE);
  }
  return null;
}
