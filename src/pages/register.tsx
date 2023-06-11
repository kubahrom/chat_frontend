import { ReactElement } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';

import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Title } from '@/components/UI/Title';
import { RegisterInputs } from '@/types/auth';
import { schemaBuilder } from '@/utils/schemaBuilder';
import Routes from '@/utils/routes';
import { useUser } from '@/hooks/useUser';
import { register } from '@/modules/auth';
import { Input } from '@/components/inputs/Input';
import { PasswordInput } from '@/components/inputs/PasswordInput';
import { Button } from '@/components/UI/Button';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { PageTitle } from '@/components/UI/PageTitle';
import { TextLink } from '@/components/UI/TextLink';

export default function RegisterPage() {
  const { t } = useTranslation();
  const {
    methods: {
      register,
      formState: { errors },
    },
    onSubmit,
    isLoading,
  } = useRegister();

  useProtectedRoute(true);

  return (
    <>
      <PageTitle title={t('auth:register.title')} />
      <Title />
      <form onSubmit={onSubmit} className="pt-8">
        <Input
          label={t('inputs:name.label')}
          id="register-name-input"
          {...register('name')}
          placeholder={t('inputs:name.placeholder')}
          error={errors.name?.message}
        />
        <Input
          label={t('inputs:email.label')}
          id="register-email-input"
          type="email"
          {...register('email')}
          wrapperClassName="mt-5"
          placeholder={t('inputs:email.placeholder')}
          error={errors.email?.message}
        />

        <PasswordInput
          label={t('inputs:password.label')}
          id="register-password-input"
          {...register('password')}
          placeholder={t('inputs:password.placeholder')}
          wrapperClassName="mt-5"
          error={errors.password?.message}
        />

        <PasswordInput
          label={t('inputs:confirm_password.label')}
          id="register-confirm-password-input"
          {...register('confirmPassword')}
          placeholder={t('inputs:confirm_password.placeholder')}
          wrapperClassName="mt-5"
          error={errors.confirmPassword?.message}
        />
        <Button className="mt-10" disabled={isLoading}>
          {t('auth:register.submit')}
        </Button>
        <p className="pt-10 text-center text-sm text-slate-400">
          <Trans
            i18nKey="auth:register.have_account"
            components={{
              link: <TextLink href={Routes.login} />,
            }}
          />
        </p>
      </form>
    </>
  );
}

RegisterPage.getLayout = (page: ReactElement) => (
  <AuthLayout>{page}</AuthLayout>
);

export const useRegister = () => {
  const { setUser } = useUser();
  const router = useRouter();

  const methods = useForm<RegisterInputs>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isLoading } = useMutation(register, {
    onSuccess: (data) => {
      methods.reset();
      setUser(data);
      router.replace(Routes.home);
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    },
  });

  const onSubmit = methods.handleSubmit((data) => mutate(data));

  return { methods, onSubmit, isLoading };
};

const loginSchema = z
  .object({
    email: schemaBuilder.email,
    password: schemaBuilder.password,
    confirmPassword: schemaBuilder.confirmPassword,
    name: schemaBuilder.name,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
