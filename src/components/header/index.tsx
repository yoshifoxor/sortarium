import { HeaderBrandLink } from './headerBrandLink';
import { HeaderLogo } from './headerLogo';

export function Header() {
  return (
    <div className="inset-x-0 top-0 z-50 mb-2 w-full shadow-lg backdrop-blur-sm">
    <div className="@container px-6 @3xl:px-0">
    <div className='flex h-(--header-height) items-center'>
      <HeaderLogo />
      <HeaderBrandLink className="ml-auto"
        brand="github"
        link="https://github.com/yoshifoxor/sortarium"
      />
    </div></div>
    </div>

  );
}

    {/* <header
      className={`
        border-border/40 bg-background/95 sticky top-0 z-50 w-full border-b
        backdrop-blur
        supports-backdrop-filter:bg-background/60
      `}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">Sortarium</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-4">
          <Link
            href="https://github.com/yoshifoxor/sortarium"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>
        </nav>
      </div>
    </header> */}
