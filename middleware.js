export const config = {
  matcher: '/(.*)',
};

export default function middleware(request) {
  const auth = request.headers.get('authorization');

  if (auth) {
    const [, encoded] = auth.split(' ');
    const [user, pwd] = atob(encoded).split(':');

    if (user === process.env.BASIC_AUTH_USER && pwd === process.env.BASIC_AUTH_PASS) {
      return;
    }
  }

  return new Response('Autenticação necessária.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Área restrita"',
    },
  });
}

