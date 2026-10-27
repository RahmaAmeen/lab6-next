import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

// Preferred port first; if it's already taken (e.g. an old server still
// running), fall back to the next one.
const PORTS = [Number(process.env.PORT ?? 3000), 5000];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Allow the Next.js frontend (port 3001, or 5001 as fallback) to call the API with cookies
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:5001'],
    credentials: true,
  });
  // Needed so AuthGuard can read request.cookies.token
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  for (const port of PORTS) {
    try {
      await app.listen(port);
      console.log(`API running on http://localhost:${port}`);
      return;
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'EADDRINUSE') throw err;
      console.warn(`Port ${port} is already in use, trying the next one...`);
    }
  }
  throw new Error(`All ports are in use: ${PORTS.join(', ')}`);
}
bootstrap();
