import React, { useState } from 'react';
import { Menu, X, Search, Bell, Package, ShoppingCart, Users, Settings, LayoutDashboard, LogOut, Home } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '../../components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import ThemeSwitcher from '../../components/ThemeSwitcher';

const DEFAULT_NAV = [
  { label: 'لوحة التحكم', href: '/dashboard', icon: LayoutDashboard, end: true },
  { label: 'المنتجات', href: '/dashboard/products', icon: Package },
  { label: 'الطلبات', href: '/dashboard/orders', icon: ShoppingCart },
  { label: 'العملاء', href: '/dashboard/customers', icon: Users },
  { label: 'الإعدادات', href: '/dashboard/settings', icon: Settings },
];

function NavItem({ item, pathname }) {
  const active = item.end
    ? pathname === item.href
    : pathname.startsWith(item.href);

  const className = cn(
    'group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-start',
    active
      ? 'bg-primary/10 text-primary'
      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
  );

  const icon = (
    <item.icon
      className={cn(
        'h-4 w-4 shrink-0',
        active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
      )}
    />
  );

  if (item.onClick) {
    return (
      <button type="button" onClick={item.onClick} aria-current={active ? 'page' : undefined} className={className}>
        {icon}
        {item.label}
      </button>
    );
  }

  return (
    <a href={item.href} aria-current={active ? 'page' : undefined} className={className}>
      {icon}
      {item.label}
    </a>
  );
}

export default function DashboardLayout({
  nav = DEFAULT_NAV,
  pathname = '/dashboard',
  title = 'لوحة التحكم',
  subtitle,
  user = { name: 'مدير النظام', role: 'المشرف العام', email: 'admin@awon.ph' },
  onLogout,
  children,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-3 border-b px-6">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
          ع
        </div>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-bold">Awon Pharmacy</p>
          <p className="truncate text-xs text-muted-foreground">لوحة الإدارة</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 border-b px-4 py-3">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        <a
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Home className="h-4 w-4 shrink-0" />
          العودة للمتجر
        </a>
        {nav.map((item) => (
          <NavItem key={item.href || item.label} item={item} pathname={pathname} />
        ))}
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/15 text-sm font-semibold text-primary">
              {user.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.role}</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onLogout}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="تسجيل الخروج"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>تسجيل الخروج</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - desktop */}
      <aside className="fixed inset-y-0 start-0 z-30 hidden w-64 border-e bg-card lg:block">
        {sidebar}
      </aside>

      {/* Sidebar - mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 start-0 w-64 border-e bg-card shadow-xl">
            <Button
              variant="ghost"
              size="icon"
              className="absolute end-3 top-4 z-10"
              onClick={() => setMobileOpen(false)}
              aria-label="إغلاق القائمة"
            >
              <X className="h-4 w-4" />
            </Button>
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="lg:ms-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="فتح القائمة"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-bold sm:text-lg">{title}</h1>
            {subtitle && <p className="hidden truncate text-xs text-muted-foreground sm:block">{subtitle}</p>}
          </div>
          <div className="hidden items-center rounded-md border border-input bg-background px-3 py-1.5 md:flex md:w-64">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="بحث في لوحة التحكم..."
              className="w-full border-0 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground" aria-label="الإشعارات">
                  <Bell className="h-5 w-5" />
                  <span className="absolute end-2 top-2 h-2 w-2 rounded-full bg-destructive" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>الإشعارات</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 p-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary/15 text-sm font-semibold text-primary">
                    {user.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium sm:inline">{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs font-normal text-muted-foreground">{user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
              <DropdownMenuItem>الإعدادات</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={onLogout}>
                تسجيل الخروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
