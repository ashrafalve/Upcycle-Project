import { redirect } from 'next/navigation';

export default function DesignerSignupPage() {
  redirect('/register?accountType=designer');
}
