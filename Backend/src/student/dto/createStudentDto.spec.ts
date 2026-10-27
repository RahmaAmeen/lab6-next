import { ValidationPipe } from '@nestjs/common';
import { createStudentDto } from './createStudentDto';

describe('createStudentDto validation', () => {
  const validationPipe = new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  const metadata = {
    type: 'body' as const,
    metatype: createStudentDto,
    data: '',
  };

  it('accepts a valid student payload', async () => {
    const payload = {
      email: 'student@example.com',
      name: 'Student',
      age: 20,
      role: 'student',
      courses: [],
      password: 'password',
    };

    const result = await validationPipe.transform(payload, metadata);

    expect(result).toBeInstanceOf(createStudentDto);
    expect(result).toEqual(payload);
  });

  it('rejects invalid fields', async () => {
    const payload = {
      email: 'not-an-email',
      name: 'Student',
      age: -1,
      role: 'student',
      courses: [],
      password: 'password',
    };

    await expect(validationPipe.transform(payload, metadata)).rejects.toMatchObject({
      response: {
        statusCode: 400,
      },
    });
  });

  it('rejects students younger than 20', async () => {
    const payload = {
      email: 'student@example.com',
      name: 'Student',
      age: 19,
      role: 'student',
      courses: [],
      password: 'password',
    };

    await expect(validationPipe.transform(payload, metadata)).rejects.toMatchObject({
      response: {
        statusCode: 400,
      },
    });
  });

  it('rejects fields without validators', async () => {
    const payload = {
      email: 'student@example.com',
      name: 'Student',
      age: 20,
      role: 'student',
      courses: [],
      password: 'password',
      unexpected: true,
    };

    await expect(validationPipe.transform(payload, metadata)).rejects.toMatchObject({
      response: {
        statusCode: 400,
      },
    });
  });
});
