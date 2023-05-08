export interface SidebarButtonProps {
  expanded: boolean;
  Icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  >;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}
