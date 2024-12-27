import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import './App.css';

const schema = z
  .object({
    nickname: z
      .string()
      .nonempty('닉네임을 입력해주세요.')
      .min(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' }),
    email: z
      .string()
      .nonempty('이메일을 입력해주세요.')
      .email({ message: '유효한 이메일 주소를 입력하세요.' }),
    password: z
      .string()
      .nonempty('비밀번호를 입력해주세요.')
      .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
        message:
          '비밀번호는 대문자, 소문자, 숫자, 특수기호를 각각 하나 이상 포함해야 합니다.',
      }),
    confirmPassword: z.string().nonempty('비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log('폼 데이터:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <label htmlFor="nickname">닉네임 : </label>
          <input id="nickname" type="text" {...register('nickname')} />
          {errors.nickname && <p>{errors.nickname.message}</p>}
        </div>
        <div>
          <label htmlFor="email">이메일 : </label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">비밀번호 : </label>
          <input id="password" type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">비밀번호 확인 : </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
      </div>
      <button type="submit">제출</button>
    </form>
  );
}

export default App;
