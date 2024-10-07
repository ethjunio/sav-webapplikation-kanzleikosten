import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col w-full bg-primary items-center justify-center h-20">
      <div className="flex flex-row gap-4">
        <Link to="/datenschutz" className="text-white">
          Datenschutz
        </Link>
        <Link to="/policy" className="text-white">
          Policy
        </Link>
      </div>
      <div className="text-white">&copy; {currentYear} SAV</div>
    </div>
  );
}
