import { Separator } from '@/components/ui/separator';

import { HeaderBrandLink } from './headerBrandLink';
import { HeaderLogo } from './headerLogo';
import { ThemeToggler } from './themeToggler';

export function Header() {
  return (
    <header
      className="top-0 z-50 mb-2 h-8 w-full p-0 shadow-lg backdrop-blur-sm"
    >
      <div className="@container px-6 @3xl:px-0">
        <div className="flex h-max items-center">
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
      </div>
    </header>
  );
}
