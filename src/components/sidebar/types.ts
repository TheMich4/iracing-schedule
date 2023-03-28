export interface SidebarButtonProps {
  children: React.ReactNode;
  Icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  >;
  onClick?: () => void;
}
