import { Test, TestingModule } from '@nestjs/testing';
import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: { signIn: jest.Mock };

  beforeEach(async () => {
    authService = {
      signIn: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    const signInDto = {
      email: 'student@example.com',
      password: 'correct-password',
    };
    const result = {
      access_token: 'access-token',
      payload: {
        userid: 'student-id',
        role: 'student',
      },
    };

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('authenticates the user, sets the token cookie, and returns the user payload', async () => {
      authService.signIn.mockResolvedValue(result);
      const response = { cookie: jest.fn() };

      await expect(controller.signIn(signInDto, response)).resolves.toEqual({
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        user: result.payload,
      });

      expect(authService.signIn).toHaveBeenCalledWith(
        signInDto.email,
        signInDto.password,
      );
      expect(response.cookie).toHaveBeenCalledWith(
        'token',
        result.access_token,
        {
          httpOnly: true,
          secure: false,
          maxAge: 3600 * 1000,
        },
      );
    });

    it('rethrows an HttpException from the authentication service', async () => {
      const error = new UnauthorizedException('Invalid email or password');
      authService.signIn.mockRejectedValue(error);

      await expect(
        controller.signIn(signInDto, { cookie: jest.fn() }),
      ).rejects.toBe(error);
    });

    it('translates unexpected errors into an internal server error', async () => {
      authService.signIn.mockRejectedValue(new Error('database unavailable'));

      await expect(
        controller.signIn(signInDto, { cookie: jest.fn() }),
      ).rejects.toEqual(
        new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'An error occurred during login',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
