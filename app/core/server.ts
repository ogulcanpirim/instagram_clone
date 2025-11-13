import { Server, Model, Response } from 'miragejs';
import { feeds } from '../../feeds';

export function makeServer({ environment = 'development' } = {}) {
  const server = new Server({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create('user', {
        id: '1',
        email: 'test@example.com',
        password: 'test123',
        username: 'testuser',
        fullName: 'Test User',
        avatar: null,
      });
    },

    routes() {
      this.namespace = 'api';

      // Login endpoint
      this.post('/login', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const { email, password } = attrs;

        const user = schema
          .all('user')
          .models.find((u: any) => u.attrs.email === email) as any;

        if (!user) {
          return new Response(
            401,
            { 'Content-Type': 'application/json' },
            {
              success: false,
              message: 'Invalid email or password',
            },
          );
        }

        const userAttrs = user.attrs as {
          id: string;
          email: string;
          password: string;
          username: string;
          fullName: string;
          avatar: string | null;
        };

        if (userAttrs.password !== password) {
          return new Response(
            401,
            { 'Content-Type': 'application/json' },
            {
              success: false,
              message: 'Invalid email or password',
            },
          );
        }

        const { password: _, ...userData } = userAttrs;
        return new Response(
          200,
          { 'Content-Type': 'application/json' },
          {
            success: true,
            message: 'Login successful',
            data: {
              user: userData,
              token: 'mock-jwt-token-' + user.id,
            },
          },
        );
      });

      this.get('/feeds', (_, request) => {
        const queryParams = request.queryParams;
        const pageParam = Array.isArray(queryParams.page)
          ? queryParams.page[0]
          : queryParams.page;
        const limitParam = Array.isArray(queryParams.limit)
          ? queryParams.limit[0]
          : queryParams.limit;
        const page = parseInt(pageParam || '1', 10);
        const limit = parseInt(limitParam || '20', 10);
        const search = Array.isArray(queryParams.search)
          ? queryParams.search[0]
          : queryParams.search;

        const validPage = Math.max(1, page);
        const validLimit = Math.max(1, Math.min(100, limit));

        const startIndex = (validPage - 1) * validLimit;
        const endIndex = startIndex + validLimit;
        const paginatedFeeds = feeds.slice(startIndex, endIndex);
        const total = feeds.length;
        const totalPages = Math.ceil(total / validLimit);
        const hasMore = endIndex < total;
        const searchedFeeds = search
          ? paginatedFeeds.filter(feed =>
              feed.name.toLowerCase().includes(search.toLowerCase()),
            )
          : paginatedFeeds;

        return new Response(
          200,
          { 'Content-Type': 'application/json' },
          {
            success: true,
            data: searchedFeeds,
            pagination: {
              page: validPage,
              limit: validLimit,
              total,
              totalPages,
              hasMore,
            },
          },
        );
      });

      this.passthrough();
    },
  });

  return server;
}
