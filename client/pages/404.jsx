import { ThemeProvider } from '@material-ui/styles';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>
        <Link href="/">Go Home</Link>
      </p>
    </div>
  );
}
