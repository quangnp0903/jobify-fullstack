import { NavLink } from 'react-router-dom';

import links from '../utils/links';
import { useDashboardContext } from '../pages/DashboardLayout';

const NavLinks: React.FC<{ isBigSidebar?: boolean }> = ({
  isBigSidebar = false,
}) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;

        // should change to admin, stats for fake-admin only
        if (role !== 'admin' && path === 'stats') return;

        return (
          <NavLink
            key={path}
            className="nav-link"
            to={path}
            onClick={isBigSidebar ? toggleSidebar : undefined}
            end
          >
            <span className="icon">{icon}</span> {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
