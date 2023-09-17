import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import helmet from 'helmet';

/**
 * We can increase thread pool size for libuv but have some considerations
 * 1. If your NodeJS App is CPU-bound(lots of synchronous computations), then increasing 'UV_THREADPOOL_SIZE' won't help much because main event loop will be the bottleneck.
 * 2. If it's I/O-bounded with lots of file operations or DNS lookups, a large thread pool might help.
 * 3. Too many threads can lead to higher memory usage and context-switching overhead.
 * 4. Most modern CPUs have multiple physical and logical cores.
 *  Node.js runs as a single-threaded process, so it uses one logical core.
 *  The libuv thread pool operations would use other cores.
 *  However, setting the thread pool size to the total number of logical cores might not be optimal since other processes and tasks also require CPU time.
 * 5. Tools like node-clinic can help you diagnose potential bottlenecks and determine if increasing the thread pool size offers any benefit.
 * 6. If your server is running other processes besides your Node.js application, consider their requirements as well. Allocating all available threads might starve other processes.
 * 7. If your Node.js application is primarily waiting on external resources, like databases, APIs, or caches, then adjusting the thread pool size might not significantly impact performance.
 *
 * In conclusion, there isn't a one-size-fits-all answer.
 * Starting with the default and then adjusting based on profiling, monitoring, and actual workload is the recommended approach.
 * It's also beneficial to understand the nature of the operations your application performs frequently and adjust accordingly.
 */
// import * as os from 'os';
// process.env.UV_THREADPOOL_SIZE = os.cpus().length.toString();

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(compression());
  app.use(helmet());

  const configService = app.get(ConfigService);

  await app.listen(configService.get<string>('port'));
}
bootstrap();
