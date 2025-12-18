import { NavLink } from 'react-router-dom';

import links from '../utils/links';
import { useDashboardContext } from '../pages/DashboardLayout';

const NavLinks: React.FC<{ isBigSidebar?: boolean }> = ({
  isBigSidebar = false,
}) => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => (
        <NavLink
          key={link.path}
          className="nav-link"
          to={link.path}
          onClick={isBigSidebar ? toggleSidebar : undefined}
          end
        >
          <span className="icon">{link.icon}</span> {link.text}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
