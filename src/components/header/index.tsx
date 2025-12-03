import { Separator } from '@/components/ui/separator';

import { HeaderBrandLink } from './headerBrandLink';
import { HeaderLogo } from './headerLogo';
import { ThemeToggler } from './themeToggler';

export function Header() {
  return (
    <header className="top-0 z-50 h-fit w-full shadow-lg">
        <div className="m-2 flex items-center p-2">
          <HeaderLogo />
          <div className="ml-auto flex h-5 items-center space-x-4">
            <ThemeToggler />
            <Separator orientation="vertical" />
            <HeaderBrandLink
              brand="github"
              link="https://github.com/yoshifoxor/sortarium"
            />
          </div>
        </div>
    </header>
  );
}
